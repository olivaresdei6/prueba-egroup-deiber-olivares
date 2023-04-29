import {DataSource, DeepPartial, FindOneOptions, FindOptionsSelect, QueryRunner, Repository} from "typeorm";
import {IGenericRepository} from "../../core/abstract/generic.repository.abstract";
import {ExceptionsService} from "../../../../../config/exceptions/exceptions.service";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {RespuestaPaginadaInterface} from "../../core/interfaces/respuesta_paginada.interface";
import { generateUUID } from "../../../../../helper/generateUUID";

export class MysqlGenericRepository<T> implements IGenericRepository<T> {
    public _repositorio: Repository<T>;
    public exepciones: ExceptionsService;

    constructor(repository: Repository<T>, private readonly dataSource: DataSource, exceptions: ExceptionsService) {
        this._repositorio = repository
        this.exepciones = exceptions;
    }


    /**
     * Método que permite buscar todos los registros de una entidad.
     * @param opcionesDeConsulta - Opciones de consulta para el select.
     * @param condicion - Condición para el where.
     * @param relaciones - Relaciones que se desean obtener.
     */
    async obtenerRegistros(opcionesDeConsulta?: FindOptionsSelect<T>, condicion?:FindOptionsWhere<T>, relaciones?:string[]): Promise<T[]> {
        const registros: T[] = await this._repositorio.find({where: condicion, relations: relaciones ? relaciones : [], select: opcionesDeConsulta});
        if (!registros) {
            this.exepciones.notFoundException({message: `No se encontraron registros en la base de datos.`});
        }
        return registros;
    }

    /**
     * Método que permite obtener un registro de la base de datos.
     * @param opcionesDeConsultas
     * @param nombreDeLaEntidad
     * @param lanzarExepcion
     */
    async obtenerUnRegistroPor(opcionesDeConsultas: FindOneOptions<T>, nombreDeLaEntidad: string, lanzarExepcion: boolean = true): Promise<T> {
        const entidad: T = await this._repositorio.findOne(opcionesDeConsultas);
        if (!entidad && lanzarExepcion) {
            if (!entidad) this.exepciones.notFoundException({message: `${nombreDeLaEntidad} no se encontró en la base de datos.`});
            // @ts-ignore
            if (entidad.estado === 0) this.exepciones.notFoundException({message: `El recurso solicitado no se encuentra disponible por el momento. Contacte al administrador.`});
        }
        return entidad;
    }

    /**
     * Método que retorna todos los registros de una entidad.
     * También se puede especificar un select y un where.
     * Tener en cuenta que una entidad representa una tabla de la base de datos.
     * @param where
     * @param options
     */
    public async obtenerRegistrosPor(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], options?: FindOneOptions<T>): Promise<T[]> {
        return await this._repositorio.find({ where, select: options.select });
    }

    /**
     * Método que convierte el dto en una entidad de la base de datos.
     * @param entidad
     */
    async crearRegistro(entidad: DeepPartial<T>): Promise<T> {
        try {
            /**
             * Se crea una nueva instancia De La Entidad de la entidad que se recibe como parámetro.
             * */
            // @ts-ignore
            const instanciaDeLaEntidad: T = this._repositorio.create({entity: entidad, uuid: generateUUID()});
            /**
             * Se guarda la nueva instancia De La Entidad de la entidad en la base de datos.
             */
            await this._repositorio.save(instanciaDeLaEntidad);

            /**
             * Se retorna la nueva instancia De La Entidadque se acaba de guardar en la base de datos.
             */
            return instanciaDeLaEntidad;

        } catch (error) {
            /**
             * Si ocurre un error, se maneja el error.
             */
            this.handleDBExceptions(error);
        }
    }

    /**
     * Método genérico para buscar registros paginados que cumplan con una condición específica o sin ella en la base de datos.
     * @param limite El límite de registros a mostrar por página.
     * @param pagina El número de página que se desea mostrar.
     * @param condicion El objeto de opciones de búsqueda para agregar la condición where (opcional).
     * @param buscarPorCampos
     * @returns Un objeto que contiene los registros de la página actual y el número total de registros.
     */
    async obtenerRegistrosPaginados<T>(limite: number, pagina: number, condicion?: FindOptionsWhere<T> | FindOptionsWhere<T>[] | string, buscarPorCampos?: string[]): Promise<RespuestaPaginadaInterface> {
        const queryBuilder = this._repositorio.createQueryBuilder();

        // Calcula el número total de registros.
        const cantidadTotalDeRegistros = await queryBuilder.getCount();

        // Calcula la cantidad de páginas necesarias.
        const paginasTotales = Math.ceil(cantidadTotalDeRegistros / limite);

        if (this.validarPaginacion(pagina, limite, paginasTotales)){
            // Si se especifica una condición, se agrega al QueryBuilder utilizando la opción 'where'.
            if (condicion) {
                if (typeof condicion === 'string') {
                    // Si la condición es una cadena, se realiza una búsqueda LIKE en los campos especificados.
                    if (buscarPorCampos && buscarPorCampos.length > 0) {
                        const likeConditions = buscarPorCampos.map(campo => `${this._repositorio.metadata.tableName}.${campo} like :valor`);
                        const valorBusqueda = `%${condicion}%`;
                        queryBuilder.where(`(${likeConditions.join(' OR ')})`, { valor: valorBusqueda });
                    }
                } else {
                    // Si la condición no es una cadena, se agrega al QueryBuilder utilizando la opción 'where'.
                    queryBuilder.where(condicion);
                }
            }

            // Establece el número de registros a omitir y el número de registros a mostrar.
            queryBuilder.skip((pagina - 1) * limite);
            queryBuilder.take(limite);

            // Ordena los resultados por ID de forma ascendente.
            queryBuilder.orderBy(`${this._repositorio.metadata.tableName}.id`, 'ASC');

            // Ejecuta la consulta y devuelve un objeto que contiene los registros de la página actual, el número total de registros, la cantidad de páginas necesarias y la cantidad de registros restantes.
            const registrosPaginados = await queryBuilder.getMany();

            return {
                cantidadTotalDeRegistros: cantidadTotalDeRegistros,
                paginasTotales: paginasTotales,
                paginaActual: pagina,
                registrosPaginados: registrosPaginados,
            };
        }
    }

    /**
     * Método que permite actualizar un registro de la base de datos.
     * @param id
     * @param entity
     */
    async actualizarRegistro(id: string | number, entity: DeepPartial<T>): Promise<T> {
        /**
         * Se crea una nueva instancia de QueryRunner para poder ejecutar transacciones.
         * Esto es necesario para poder hacer rollback en caso de que ocurra un error.
         */
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            // @ts-ignore
            let instanceToUpdate: T = typeof id === 'string'  ? await this._repositorio.findOne({ where: { uuid: id } }) : await this.obtenerUnRegistro({ where: { id } });

            /**
             * Se hace uso del método merge() del repositorio para actualizar los datos del registro.
             */
            instanceToUpdate = this._repositorio.merge(instanceToUpdate, entity);

            /**
             * Se actualiza el registro en la base de datos.
             */
            const updatedInstance = await queryRunner.manager.save(instanceToUpdate);

            /**
             * Se confirman los cambios en la base de datos.
             */
            await queryRunner.commitTransaction();
            /**
             * Se retorna el registro actualizado.
             */
            return updatedInstance;
        } catch (error) {
            /**
             * Si ocurre un error, se deshacen los cambios en la base de datos.
             */
            await queryRunner.rollbackTransaction();
            /**
             * Se manejan las excepciones que puedan ocurrir.
             */
            this.handleDBExceptions(error);
        } finally {
            /**
             * Se libera el queryRunner. Esto es importante para que la conexión a la base de datos no se mantenga abierta.
             */
            await queryRunner.release();
        }
    }

    /**
     * Método que permite ejecutar un query en la base de datos.
     * @param query - Query a ejecutar.
     */
    async ejecutarQuerySQL(query: string) {
        /**
         * El queryRunner permite ejecutar queries en la base de datos.
         * En este caso, se usa para ejecutar una transacción. Esto permite que si ocurre un error en el
         * proceso, se deshaga lo que se haya hecho.
         *
         * El dataSource permite obtener la conexión a la base de datos y ejecutar queries.
         */
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {
            /**
             * Se realiza la conexión a la base de datos.
             */
            await queryRunner.connect();
            /**
             * Se inicia una transacción. Esto permite que si ocurre un error en el proceso, se deshaga lo que se haya hecho.
             */
            await queryRunner.startTransaction();
            /**
             * Se ejecuta el query que se recibe como parámetro.
             */
            const resultadoDelQuery = await queryRunner.query(query);
            /**
             * Se confirman los cambios en la base de datos.
             */
            await queryRunner.commitTransaction();
            /**
             * Se cierra la conexión a la base de datos.
             */
            await queryRunner.release();
            /**
             * Se devuelve el resultado del query.
             */
            return resultadoDelQuery;
        }catch (e) {
            this.handleDBExceptions(e);
        } finally {
            await queryRunner.release();
        }
    }

    public validarPaginacion(pagina: number, limite: number, totalDePaginas:number): boolean {
        if (totalDePaginas === 0){
            this.exepciones.notFoundException({message: 'No se encontraron registros.'});
        }
        if (pagina > totalDePaginas){
            this.exepciones.badRequestException({message: 'El número de página es mayor al número de páginas'});
        }

        if (pagina <= 0 || limite <= 0) {
            this.exepciones.badRequestException({message: 'El número de página y límite deben ser mayor a 0'});
        }
        if (limite > totalDePaginas) {
            this.exepciones.badRequestException({message: 'El límite debe ser menor o igual al número de registros totales'});
        }

        if (pagina > totalDePaginas) {
            this.exepciones.badRequestException({message: 'El número de página debe ser menor o igual al número de páginas'});
        }

        return true;
    }

    /**
     * Método para manejar las excepciones que puede generar la base de datos.
     * @param error
     * @return void
     */
    handleDBExceptions(error: any): void {
        /**
         * Comprobando si el código de error es 23505, que es el código para
         * una violación de restricción única.
         * */
        if (error.errno === 1062) {
            this.exepciones.badRequestException({message: "Ya existe un registro con los datos proporcionados."});
        }

        if (error.errno === 1364) {
            this.exepciones.badRequestException({message: "Los datos proporcionados no son válidos."});
        }

        if (error.code === '23503') {
            this.exepciones.badRequestException({message: "Los datos proporcionados no son válidos."});
        }
        if (error.code === '23502') {
            this.exepciones.notFoundException({message: error.response.message});
        }

        this.exepciones.internalServerErrorException({message: error});
    }
}
