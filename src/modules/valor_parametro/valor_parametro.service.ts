import { BadRequestException, Injectable } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { CrearValorParametroDto } from "./dto/crear-valor_parametro.dto";
import { ValorParametroEntity } from "../../frameworks/database/mysql/entities";
import { ActualizarParametroDto } from "../parametro/dto/actualizar-parametro.dto";
import { ActualizarValorParametroDto } from "./dto/actualizar-valor_parametro.dto";

@Injectable()
export class ValorParametroService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}
    
    
    async crearRegistro(crearValorParametroDto: CrearValorParametroDto) : Promise<ValorParametroEntity> {
        const idParametro = await this.obtenerIdParametroPorUUID(crearValorParametroDto.uuid_parametro);
        return await this.servicioDeBaseDeDatos.valorParametro.crearRegistro({...crearValorParametroDto, parametro: idParametro});
    }
    
    async obtenerTodosLosRegistros(): Promise<ValorParametroEntity[]> {
        return await this.servicioDeBaseDeDatos.valorParametro.obtenerRegistros();
    }
    
    async obtenerUnRegistro(uuid: string) {
        return await this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({where: {uuid}}, 'Valor parámetro');
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        const camposPermitidos = [ 'nombre', 'descripcion', 'observacion'];
        if (campo && !camposPermitidos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Los campos permitidos son: ' + camposPermitidos.join(', '));
        }
        if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.valorParametro.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.valorParametro.obtenerRegistrosPaginados({limite, pagina});
        }
    }
    
    async actualizarRegistro(uuid: string, actualizarValorParametroDto: ActualizarValorParametroDto) : Promise<ValorParametroEntity> {
        const {uuid_parametro} = actualizarValorParametroDto;
        if (uuid_parametro) {
            const idParametro = await this.obtenerIdParametroPorUUID(actualizarValorParametroDto.uuid_parametro);
            return await this.servicioDeBaseDeDatos.valorParametro.actualizarRegistro(uuid, {...actualizarValorParametroDto, parametro: idParametro});
        }else{
            return await this.servicioDeBaseDeDatos.valorParametro.actualizarRegistro(uuid, actualizarValorParametroDto);
        }
    }

    private async obtenerIdParametroPorUUID(uuid: string) {
        const {id} = await this.servicioDeBaseDeDatos.parametro.obtenerUnRegistroPor(
            {where: {uuid}},
            'Parámetro'
        );
        return id;
    }

    private
    
}
