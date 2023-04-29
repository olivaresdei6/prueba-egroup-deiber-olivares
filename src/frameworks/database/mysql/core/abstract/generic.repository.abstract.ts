import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {DeepPartial, FindOneOptions, FindOptionsSelect} from "typeorm";
import { RespuestaPaginadaInterface } from "../interfaces/respuesta_paginada.interface";

export abstract class IGenericRepository<T> {

    public abstract obtenerRegistros(opcionesDeConsulta?: FindOptionsSelect<T>, condicion?:FindOptionsWhere<T>, relaciones?:string[]): Promise<T[]>;

    public abstract obtenerUnRegistroPor(opcionesDeConsultas: FindOneOptions<T>, nombreDeLaEntidad: string, lanzarExepcion: boolean): Promise<T>

    public abstract obtenerRegistrosPor(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], options?: FindOneOptions<T>): Promise<T[]>;

    public abstract obtenerRegistrosPaginados<T>(limite: number, pagina: number, condicion?: FindOptionsWhere<T> | FindOptionsWhere<T>[], buscarPorCampos?: string[]): Promise<RespuestaPaginadaInterface>;

    public abstract crearRegistro(entidad: DeepPartial<T>): Promise<T>;

    public abstract actualizarRegistro(id: string | number, entity: DeepPartial<T>): Promise<T>;

    public abstract ejecutarQuerySQL(query: string);

    public abstract validarPaginacion(page: number, limit: number, total:number): boolean;
}
