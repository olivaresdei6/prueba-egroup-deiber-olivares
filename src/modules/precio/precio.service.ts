import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { CrearPrecioDto } from "./dto/crear-precio.dto";
import { PrecioEntity } from "../../frameworks/database/mysql/entities";
import { ActualizarPrecioDto } from "./dto/actualizar-precio.dto"
import { BadRequestException, Injectable } from "@nestjs/common";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class PrecioService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async crearRegistro(crearPrecioDto: CrearPrecioDto)  {
        const precio = await this.servicioDeBaseDeDatos.precio.crearRegistro( crearPrecioDto );
        return {
            status: 201,
            message: 'Precio creado correctamente',
            data: precio,
        }

    }

    async obtenerTodosLosRegistros(): Promise<PrecioEntity[]> {
        return await this.servicioDeBaseDeDatos.precio.obtenerRegistros();
    }

    async obtenerUnRegistro(uuid: string): Promise<PrecioEntity> {
        return await this.servicioDeBaseDeDatos.precio.obtenerUnRegistroPor({where: {uuid}}, 'Precio');
    }


    async obtenerRegistrosPaginados(limite: number, pagina: number) {
            return await this.servicioDeBaseDeDatos.precio.obtenerRegistrosPaginados({limite, pagina});
    }

    async actualizarRegistro(uuid: string, actualizarPrecioDto: ActualizarPrecioDto)  {
        await this.servicioDeBaseDeDatos.precio.actualizarRegistro(uuid, actualizarPrecioDto);
        return {
            status: 200,
            message: 'Precio actualizado correctamente',
        }

    }

}
