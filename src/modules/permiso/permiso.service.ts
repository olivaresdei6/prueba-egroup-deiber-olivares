import { BadRequestException, Injectable } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import {
    ParametroEntity, PermisoEntity,
    PermisoModuloEntity,
    PermisoRolEntity,
    PermisoRutaEntity
} from "../../frameworks/database/mysql/entities";
import { CrearPermisoDto } from "./dto/crear-permiso.dto";
import { PermisoModule } from "./permiso.module";
import { ActualizarPermisoDto } from "./dto/actualizar-permiso.dto";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class PermisoService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}
    
    
    async crearRegistro(crearPermisoDto: CrearPermisoDto)  {
        const { uuidRuta, uuidModulo, uuidRol } = crearPermisoDto;
        const [idRuta, idModulo, idRol] = await Promise.all([
            this.obtenerIdRuta(uuidRuta),
            this.obtenerIdModulo(uuidModulo),
            this.obtenerRol(uuidRol)
        ]);
        await this.servicioDeBaseDeDatos.permiso.crearRegistro({
            ...crearPermisoDto,
            ruta: idRuta.id,
            modulo: idModulo.id,
            rol: idRol.id,
        });
        return {
            status: 201,
            message: 'Permiso creado correctamente',
        }
    }
    
    async obtenerTodosLosRegistros(): Promise<PermisoEntity[]> {
        return await this.servicioDeBaseDeDatos.permiso.obtenerRegistros();
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.permiso.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.permiso.obtenerRegistrosPaginados({limite, pagina});
        }
    }

    async obtenerUnRegistro(uuid: string): Promise<PermisoEntity> {
        return await this.servicioDeBaseDeDatos.permiso.obtenerUnRegistroPor({where: {uuid}}, 'Permiso');
    }

    async actualizarRegistro(uuid: string, actualizarPermisoDto: ActualizarPermisoDto)  {
        const { uuidRuta, uuidModulo, uuidRol, observacion, descripcion } = actualizarPermisoDto;
        if (uuidRuta) await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(uuid, { ruta: (await this.obtenerIdRuta(uuidRuta)).id });
        if (uuidModulo) await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(uuid, { modulo: (await this.obtenerIdModulo(uuidModulo)).id });
        if (uuidRol) await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(uuid, { rol: (await this.obtenerRol(uuidRol)).id });
        await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(uuid, { observacion, descripcion });
        return {
            status: 200,
            message: 'Permiso actualizado correctamente',
        }
    }
    
    async obtenerIdRuta(uuid: string): Promise<PermisoRutaEntity> {
        return await this.servicioDeBaseDeDatos.permisoRuta.obtenerUnRegistroPor({where: {uuid}}, 'Ruta');
    }

    async obtenerIdModulo(uuid: string): Promise<PermisoModuloEntity> {
        return await this.servicioDeBaseDeDatos.permisoModulo.obtenerUnRegistroPor({where: {uuid}}, 'Modulo');
    }

    async obtenerRol(uuid: string): Promise<PermisoRolEntity> {
        return await this.servicioDeBaseDeDatos.permisoRol.obtenerUnRegistroPor({where: {uuid}}, 'Rol');
    }
}
