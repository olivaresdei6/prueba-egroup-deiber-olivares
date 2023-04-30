import { BadRequestException, Injectable } from "@nestjs/common";
import {CrearParametroDto} from './dto/crear-parametro.dto';
import {ActualizarParametroDto} from './dto/actualizar-parametro.dto';
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { ParametroEntity } from "../../frameworks/database/mysql/entities";
import { when } from "joi";

@Injectable()
export class ParametroService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}
    
    
    async crearRegistro(crearParametroDto: CrearParametroDto) : Promise<ParametroEntity> {
        console.log('ParametroService.crearRegistro');
        console.log('Dto', crearParametroDto);
        return await this.servicioDeBaseDeDatos.parametro.crearRegistro(crearParametroDto)
    }
    
    async obtenerTodosLosRegistros(): Promise<ParametroEntity[]> {
        return await this.servicioDeBaseDeDatos.parametro.obtenerRegistros();
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        const camposPermitidos = [ 'nombre', 'descripcion', 'observacion'];
        if (campo && !camposPermitidos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido');
        }
        if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.parametro.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.parametro.obtenerRegistrosPaginados({limite, pagina});
        }
    }
    
    async obtenerUnRegistro(uuid: string): Promise<ParametroEntity> {
        return await this.servicioDeBaseDeDatos.parametro.obtenerUnRegistroPor({where: {uuid}}, 'Parámetro');
    }
    
    async actualizarRegistro(uuid: string, actualizarParametroDto: ActualizarParametroDto) : Promise<ParametroEntity> {
        console.log('ParametroService.actualizarRegistro');
        return await this.servicioDeBaseDeDatos.parametro.actualizarRegistro(uuid, actualizarParametroDto);
    }
}
