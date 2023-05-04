import { BadRequestException, Injectable } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import {
    CategoriaEntity,
    CategoriaTipoProductoEntity,
    DepartamentoEntity,
    ParametroEntity,
    ProductoEntity,
    TipoProductoEntity,
    ValorParametroEntity
} from "../../frameworks/database/mysql/entities";
import {
    ActualizarCategoriaDto,
    ActualizarCategoriaTipoDeProductoDto,
    ActualizarProductoDto,
    ActualizarTipoDeProductoDto,
    CrearCategoriaDto,
    CrearCategoriaTipoProductoDto,
    CrearProductoDto,
    CrearTipoDeProductoDto
} from "./dto";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";
import { ParametroEnum } from "../../objetos-genericos/parametro.enum";
import { ValorParametroInterface } from "../../objetos-genericos/valor-parametro.interface";

@Injectable()
export class ProductoService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async crearRegistro(crearDto: CrearCategoriaDto | CrearTipoDeProductoDto | CrearCategoriaTipoProductoDto | CrearProductoDto)  {
        if (crearDto instanceof CrearCategoriaDto) return await this.crearCategoria(crearDto);
        else if (crearDto instanceof CrearTipoDeProductoDto) return await this.crearTipoDeProducto(crearDto);
        else if (crearDto instanceof CrearCategoriaTipoProductoDto) return await this.crearCategoriaTipoProducto(crearDto);
        else if (crearDto instanceof CrearProductoDto) return await this.crearProducto(crearDto);
        throw new BadRequestException('Tipo de registro no válido');
    }

    async obtenerTodosLosRegistros(entidad: string): Promise<CategoriaTipoProductoEntity[] | CategoriaEntity[]| ProductoEntity[] | TipoProductoEntity[]> {
        entidad = entidad ? entidad.toLowerCase() : 'producto';
        switch (entidad.toLowerCase()) {
            case 'categoria': return await this.servicioDeBaseDeDatos.categoria.obtenerRegistros();
            case 'tipo_de_producto': return await this.servicioDeBaseDeDatos.tipoProducto.obtenerRegistros();
            case 'categoria tipo producto': return await this.servicioDeBaseDeDatos.categoriaTipoProducto.obtenerRegistros();
            case 'producto': return await this.servicioDeBaseDeDatos.producto.obtenerRegistros();
            default: throw new BadRequestException('No se puede obtener los registros. Entidad no encontrada. Se esperaba en el nombre del campo: categoria, tipo de producto, categoria tipo producto o producto');
        }
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.producto.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.producto.obtenerRegistrosPaginados({limite, pagina});
        }
    }


    async actualizarRegistro(uuid: string, actualizarDto: ActualizarTipoDeProductoDto | ActualizarCategoriaTipoDeProductoDto | ActualizarProductoDto | ActualizarCategoriaDto) {
        let entidad: TipoProductoEntity | CategoriaTipoProductoEntity | ProductoEntity | CategoriaEntity;
        switch (actualizarDto.constructor) {
            case ActualizarTipoDeProductoDto:
                const { uuidCategoria, uuidTipoProducto } = actualizarDto as ActualizarCategoriaTipoDeProductoDto;
                const fetchPromises = [ uuidCategoria && this.obtenerCategoria(uuidCategoria), uuidTipoProducto && this.obtenerTipoProducto(uuidTipoProducto)];
                const [categoria, tipoProducto] = await Promise.all(fetchPromises);
                entidad = await this.servicioDeBaseDeDatos.tipoProducto.actualizarRegistro(uuid, {
                    ...actualizarDto, ...(categoria && {categoria: categoria.id}), ...(tipoProducto && {tipoProducto: tipoProducto.id}),
                });
                break;
            case ActualizarCategoriaDto:
                entidad = await this.servicioDeBaseDeDatos.categoria.actualizarRegistro(uuid, actualizarDto);
                break;
            case ActualizarProductoDto:
                const dto = await this.construirDto(actualizarDto)
                entidad = await this.servicioDeBaseDeDatos.producto.actualizarRegistro(uuid, dto);
                break;
            default:
                throw new BadRequestException('No se puede actualizar el registro. Entidad no encontrada. Se esperaba en el nombre del campo: categoria, tipo de producto, categoria tipo producto o producto');
        }
        return entidad && { status: 200, message: 'Registro actualizado correctamente', }
    }


    /**
     * Métodos privados
     */

    private async obtenerCategoria(uuid: string): Promise<DepartamentoEntity> {
        return await this.servicioDeBaseDeDatos.categoria.obtenerUnRegistroPor({where: {uuid}}, 'Departamento');
    }

    private async obtenerTipoProducto(uuid: string): Promise<TipoProductoEntity> {
        return await this.servicioDeBaseDeDatos.tipoProducto.obtenerUnRegistroPor({where: {uuid}}, 'TipoProducto');
    }

    private async obtenerParametro(uuid: string, lanzarExepcion = false): Promise<ParametroEntity> {
        return await this.servicioDeBaseDeDatos.parametro.obtenerUnRegistroPor({where: {uuid}}, 'Parametro', lanzarExepcion);
    }

    private async obtenerValorParametro(uuid: string, lanzarExepcion = false): Promise<ValorParametroEntity> {
        return await this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({where: {uuid}}, 'ValorParametro', lanzarExepcion);
    }

    /**
     * Método que crea una categoría - Esta categoría se crea en base a su DTO y se guarda en la base de datos.
     * Cabe resaltar que el uuid y el id se generan en el método generico de crear registro
     * @param crearDto
     * @private
     */
    private async crearCategoria(crearDto: CrearCategoriaDto): Promise<{ status: number; message: string }> {
        await this.servicioDeBaseDeDatos.categoria.crearRegistro(crearDto);
        return {
            status: 201,
            message: 'Registro creado correctamente',
        };
    }

    /**
     * Método que crea un tipo de producto
     * @param crearDto
     * @private
     */
    private async crearTipoDeProducto(crearDto: CrearTipoDeProductoDto): Promise<{ status: number; message: string }> {
        await this.servicioDeBaseDeDatos.tipoProducto.crearRegistro(crearDto);
        return {
            status: 201,
            message: 'Registro creado correctamente',
        };
    }

    /**
     * Método que crea una relación entre una categoría y un tipo de producto
     * @param crearDto
     * @private
     */
    private async crearCategoriaTipoProducto(crearDto: CrearCategoriaTipoProductoDto): Promise<{ status: number; message: string }> {
        /**
         * Se obtienen los registros de la categoría y el tipo de producto, su UUID en el dto
         */
        const { uuidCategoria, uuidTipoProducto } = crearDto as CrearCategoriaTipoProductoDto;
        /**
         * Se crea una promesa para obtener la categoría y el tipo de producto al mismo tiempo, con ello se evita tener que esperar a que se obtenga la categoría para obtener el tipo de producto
         * y como no dependen una de la otra, se puede obtener en paralelo. Aumenmta la velocidad de respuesta.
         * @type {Promise<DepartamentoEntity | TipoProductoEntity>}
         */
        const fetchPromises = [ uuidCategoria && this.obtenerCategoria(uuidCategoria), uuidTipoProducto && this.obtenerTipoProducto(uuidTipoProducto)];
        /**
         * Se ejecuta la promesa y se obtienen los registros de la categoría y el tipo de producto. Si llega a fallar una de las dos, se detiene la ejecución y se lanza una excepción.
         * La exepción se lanza desde el método obtenerUnRegistroPor, si no se encuentra el registro, se lanza una excepción.
         */
        const [tipoProducto, categoria] = await Promise.all(fetchPromises);

        /**
         * Se crea el registro de la relación entre la categoría y el tipo de producto.
         * La razon por la que no se paso el dto directamente al método crearRegistro, es porque el dto no tiene los campos de la relación, solo tiene los UUID de la categoría y el tipo de producto
         * y por motivos de seguridad, no se exponen los id de las entidades, solo los UUID.
         */
        await this.servicioDeBaseDeDatos.categoriaTipoProducto.crearRegistro({ ...crearDto, categoria: categoria.id, tipoProducto: tipoProducto.id });
        return {
            status: 201,
            message: 'Registro creado correctamente',
        };
    }

    /**
     * Método que crea un producto
     * @param crearDto - DTO con el que se creará el producto
     * @private
     */
    private async crearProducto(crearDto: CrearProductoDto): Promise<{ status: number; message: string }> {
        const dto = await this.construirDto(crearDto)
        await this.servicioDeBaseDeDatos.producto.crearRegistro(dto);
        return {
            status: 201,
            message: 'Registro creado correctamente',
        }


    }

    private validarValoresParametros(valoresParametros: ValorParametroInterface[]){
        for(let valorParametro of valoresParametros){
            const {parametro, valorParametro: valor} = valorParametro;
            if (!valor) continue;
            // @ts-ignore
            if (valor.parametro.nombre !== parametro) {
                return {
                    resultado: false,
                    mensaje: `El valor UUID: ${valor.uuid} no corresponde al parámetro ${parametro}`
                }
            }
        }
        return {
            resultado: true,
            mensaje: 'Los valores de los parámetros son válidos.'
        }
    }

    private async fetchUuidProductos (dtoProducto: CrearProductoDto | ActualizarProductoDto){
        /**
         * Se obtienen los registros de los productos, tipo de productos, categorías, colores, materiales, características y valores de características, su UUID en el dto.
         * Esto se hace con la finalidad de garantizar la integridad de los datos y sus relaciones.
         */
        const {
            uuidCaracteristica1, uuidCaracteristica2, uuidTipoProducto,
            uuidTipoUsuario, uuidColor, uuidMaterial, uuidValorCaracteristica1, uuidValorCaracteristica2,
        } = dtoProducto as CrearProductoDto | ActualizarProductoDto;
        /**
         * Se crea una promesa para obtener los registros de los productos, tipo de productos, categorías, colores, materiales, características y valores de
         * características al mismo tiempo, con ello se evita tener que esperar a que se obtenga la categoría para obtener el tipo de producto
         * y como no dependen una de la otra, se puede obtener en paralelo. Aumenmtando así la velocidad de respuesta.
         * Tal vez le parezca extraño la forma del arreglo, por ello se explica a continuación:
         * Tomemos como ejemplo el indice 0 del arreglo, el cual tiene la siguiente estructura:
         * uuidCaracteristica1 && this.obtenerParametro(uuidCaracteristica1)
         * Lo que se hace es validar que el uuidCaracteristica1 exista, si existe, se ejecuta el método this.obtenerParametro(uuidCaracteristica1), el cual retorna una promesa.
         * Si el uuidCaracteristica1 no existe, no se ejecuta el método this.obtenerParametro(uuidCaracteristica1), por lo que no se ejecuta la promesa, devolviendo un undefined.
         */
        const tipoProducto = await this.obtenerTipoProducto(uuidTipoProducto);
        const fetchPromisesParametros = [
            uuidCaracteristica1 && this.obtenerParametro(uuidCaracteristica1), uuidCaracteristica2 && this.obtenerParametro(uuidCaracteristica2)
        ];

        const fetchPromisesValoresParametros = [
            uuidValorCaracteristica1 && this.obtenerValorParametro(uuidValorCaracteristica1),
            uuidValorCaracteristica2 && this.obtenerValorParametro(uuidValorCaracteristica2),
            uuidTipoUsuario && this.obtenerValorParametro(uuidTipoUsuario),
            uuidColor && this.obtenerValorParametro(uuidColor),
            uuidMaterial && this.obtenerValorParametro(uuidMaterial),
        ];

        /**
         * Se ejecuta la promesa y se obtienen los registros de los productos, tipo de productos, categorías, colores, materiales, características y valores de
         * características. Si llega a fallar una de las promesas, se detiene la ejecución y se lanza una excepción. Por ello se valida que no sea undefined.
         */
        const [caracteristica1, caracteristica2] = await Promise.all(fetchPromisesParametros);

        const [
            valorCaracteristica1, valorCaracteristica2, tipoUsuario, color,
            material
        ] = await Promise.all(fetchPromisesValoresParametros);

        if (
            (uuidCaracteristica1 && !uuidValorCaracteristica1) || (!uuidCaracteristica1 && uuidValorCaracteristica1) ||
            (uuidCaracteristica2 && !uuidValorCaracteristica2) || (!uuidCaracteristica2 && uuidValorCaracteristica2)
        ) {
            throw new BadRequestException('Se debe proporcionar tanto la característica como su valor correspondiente.');
        }
        // @ts-ignore
        if ((caracteristica1 && valorCaracteristica1) && (caracteristica1.id !== valorCaracteristica1.parametro.id)) {
            throw new BadRequestException('La característica 1 y su valor no coinciden.');
        }
        // @ts-ignore
        if ((caracteristica2 && valorCaracteristica2) && (caracteristica2.id !== valorCaracteristica2.parametro.id)) {
            throw new BadRequestException('La característica 2 y su valor no coinciden.');
        }

        return{
            caracteristica1, caracteristica2,
            valorCaracteristica1, valorCaracteristica2,
            tipoUsuario, color, material, tipoProducto
        }

    }

    private async construirDto (dto: ActualizarProductoDto | CrearProductoDto) {
        const {tipoProducto, caracteristica1, caracteristica2, valorCaracteristica1, valorCaracteristica2, tipoUsuario, color, material} = await  this.fetchUuidProductos(dto)
        const resultadoValidacion = this.validarValoresParametros([
            { parametro: ParametroEnum.color, valorParametro: color && color},
            { parametro: ParametroEnum.material, valorParametro: material && material},
            { parametro: ParametroEnum.tiposDeUsuarios, valorParametro: tipoUsuario && tipoUsuario},

        ]);
        if (!resultadoValidacion.resultado) {
            throw new BadRequestException(resultadoValidacion.mensaje);
        }
        /**
         * Se crea el registro del producto.
         * Esta sintaxis es un poco extraña, pero es para evitar que se envíen campos vacíos a la base de datos.
         * Por ejemplo, si no se proporciona el color, no se envía el campo color a la base de datos, por lo que no se crea el registro.
         * Los ... son para desestructurar el objeto, es decir, si el objeto tiene la siguiente estructura:
         * ...(caracteristica1 && { caracteristica1: caracteristica1.id }),
         * Si caracteristica1 existe, se crea el objeto de la siguiente forma:
         * { caracteristica1: caracteristica1.id }
         * Si caracteristica1 no existe, se crea el objeto de la siguiente forma:
         * {} - Esto no se envía a la base de datos, por lo que no si ese campo es obligatorio, no se crea el registro, caso contrario, se crea el registro pero con el campo vacío.
         */
        return {
            ...dto,
            ...(caracteristica1 && { caracteristica1: caracteristica1.id }),
            ...(valorCaracteristica1 && { valorCaracteristica1: valorCaracteristica1.id }),
            ...(caracteristica2 && { caracteristica2: caracteristica2.id }),
            ...(valorCaracteristica2 && { valorCaracteristica2: valorCaracteristica2.id }),
            ...(tipoProducto && { tipoDeProducto: tipoProducto.id }),
            ...(tipoUsuario && { idTipoUsuario: tipoUsuario.id }),
            ...(color && { color: color.id }),
            ...(material && { material: material.id })
        }
    }
}

