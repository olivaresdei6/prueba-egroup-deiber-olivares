import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CrearPermisoModuloDto } from "./dto/crear-permiso-modulo.dto";
import { PermisoModuloEntity } from "../../frameworks/database/mysql/entities";
import { ActualizarPermisoModuloDto } from "./dto/actualizar-permiso-modulo.dto";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class PermisoModuloService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async crearRegistro(crearModuloDto: CrearPermisoModuloDto)  {
        const permisoModulo =  await this.servicioDeBaseDeDatos.permisoModulo.crearRegistro(crearModuloDto);
        if (permisoModulo) {
            return {
                status: 201,
                message: 'Modulo De Permiso creado correctamente',
            }
        }
    }

    async obtenerTodosLosRegistros(): Promise<PermisoModuloEntity[]> {
        return await this.servicioDeBaseDeDatos.permisoModulo.obtenerRegistros();
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.permisoModulo.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.permisoModulo.obtenerRegistrosPaginados({limite, pagina});
        }
    }

    async obtenerUnRegistro(uuid: string): Promise<PermisoModuloEntity> {
        return await this.servicioDeBaseDeDatos.permisoModulo.obtenerUnRegistroPor({where: {uuid}}, 'Modulo De Permiso');
    }

    async actualizarRegistro(uuid: string, actualizarPermisoModuloDto: ActualizarPermisoModuloDto)  {
        const moduloPermiso = await this.servicioDeBaseDeDatos.permisoModulo.actualizarRegistro(uuid, actualizarPermisoModuloDto);
        if (moduloPermiso) {
            return {
                status: 201,
                message: 'Modulo de permiso actualizado correctamente',
            }
        }
    }

}
