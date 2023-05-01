import { BadRequestException, Injectable } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { CrearValorParametroDto } from "./dto/crear-valor_parametro.dto";
import { ValorParametroEntity } from "../../frameworks/database/mysql/entities";
import { ActualizarValorParametroDto } from "./dto/actualizar-valor_parametro.dto";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class ValorParametroService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}
    
    
    async crearRegistro(crearValorParametroDto: CrearValorParametroDto)  {
        const idParametro = await this.obtenerIdParametroPorUUID(crearValorParametroDto.uuid_parametro);
        const valorParametro = await this.servicioDeBaseDeDatos.valorParametro.crearRegistro({...crearValorParametroDto, parametro: idParametro});
        if (valorParametro) {
            return {
                status: 201,
                message: 'Valor parámetro creado correctamente',
            }
        }
    }
    
    async obtenerTodosLosRegistros(): Promise<ValorParametroEntity[]> {
        return await this.servicioDeBaseDeDatos.valorParametro.obtenerRegistros();
    }
    
    async obtenerUnRegistro(uuid: string) {
        return await this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({where: {uuid}}, 'Valor parámetro');
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.valorParametro.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.valorParametro.obtenerRegistrosPaginados({limite, pagina});
        }
    }

    async actualizarRegistro(uuid: string, actualizarValorParametroDto: ActualizarValorParametroDto){
        const valorParametro = await this.servicioDeBaseDeDatos.valorParametro.actualizarRegistro(uuid, actualizarValorParametroDto);
        if (valorParametro) {
            return {
                status: 201,
                message: 'Parámetro actualizado correctamente',
            }
        }
    }
    private async obtenerIdParametroPorUUID(uuid: string) {
        const {id} = await this.servicioDeBaseDeDatos.parametro.obtenerUnRegistroPor(
            {where: {uuid}},
            'Parámetro'
        );
        return id;
    }
    
}
