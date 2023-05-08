import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CrearInventarioDto } from "./dto/crear-inventario.dto";
import { InventarioEntity } from "../../frameworks/database/mysql/entities";
import { ActualizarInventarioDto } from "./dto/actualizar-inventario.dto";

@Injectable()
export class InventarioService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async crearRegistro(crearInventarioDto: CrearInventarioDto)  {
        const {cantidadComprada, cantidadDisponible, cantidadReservada, uuidPrecio, uuidProducto, ...resto} = crearInventarioDto;
        const precio = await this.obtenerPrecio(uuidPrecio);
        const producto = await this.obtenerProducto(uuidProducto);
        const cantDisponible = cantidadComprada - cantidadReservada;
        const inventario = await this.servicioDeBaseDeDatos.inventario.crearRegistro( {
            ...resto,
            precio: precio.id,
            producto: producto.id,
            cantidad: cantidadComprada,
            cantidadDisponible: cantDisponible,
            cantidadReservada,
        });

        return {
            status: 201,
            message: 'Inventario creado correctamente',
            inventario,
        }

    }

    async obtenerTodosLosRegistros(): Promise<InventarioEntity[]> {
        return await this.servicioDeBaseDeDatos.inventario.obtenerRegistros();
    }

    async obtenerUnRegistro(uuid: string): Promise<InventarioEntity> {
        return await this.servicioDeBaseDeDatos.inventario.obtenerUnRegistroPor({where: {uuid}}, 'Inventario');
    }

    async actualizarRegistro(uuid: string, actualizarPrecioDto: ActualizarInventarioDto)  {
        const {uuidPrecio, ...resto} = actualizarPrecioDto;
        const precio = await this.obtenerPrecio(uuidPrecio, true);
        const inventario = await this.servicioDeBaseDeDatos.inventario.actualizarRegistro(uuid,{
            ...resto,
            precio: precio.id,
        });

        return {
            status: 200,
            message: 'Inventario actualizado correctamente',
            inventario,
        }
    }

    private async obtenerPrecio(uuidPrecio: string, isUpdate: boolean = false) {
        const precio = await this.servicioDeBaseDeDatos.precio.obtenerUnRegistroPor({where: {uuid: uuidPrecio}}, 'Precio', isUpdate);
        if (!precio && isUpdate) {
            throw new BadRequestException('El precio no existe');
        }
        return precio;
    }

    private async obtenerProducto(uuidProducto: string, isUpdate: boolean = false) {
        const producto = await this.servicioDeBaseDeDatos.producto.obtenerUnRegistroPor({where: {uuid: uuidProducto}}, 'Producto', isUpdate);
        if (!producto && isUpdate) {
            throw new BadRequestException('El producto no existe');
        }
        return producto;
    }
}
