import { BadRequestException, Injectable } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { CarritoDto } from "./dto/carrito.dto";
import {
    CuponDeDescuentoEntity,
    DireccionEntity,
    InventarioEntity,
    PrecioEntity
} from "../../frameworks/database/mysql/entities";


@Injectable()
export class VentaService {
    constructor(
        private readonly servicioDeBaseDeDatos: IConexionDb
    ) {}

    async agregarAlCarrito(carritoDto: CarritoDto, idUsuario: number) {
        const { esADomicilio, uuidDireccion, productos, descripcion, observacion } = carritoDto;
        let direccion;
       if (esADomicilio && !uuidDireccion) {
           direccion = await this.obtenerDireccion(esADomicilio, uuidDireccion);
       }

        let totalAPagar: number | PrecioEntity = 0;
        let totalDescuento = 0;
        console.log('usuario Carrito', idUsuario);
        const carrito = await this.crearCarrito(idUsuario,   direccion , esADomicilio, descripcion, observacion);

        for (const producto of productos) {
            const { uuidProducto, cantidadSolicitada, uuidCupon } = producto;
            const productoEncontrado = await this.validarProducto(uuidProducto);
            const inventario = await this.validarInventario(productoEncontrado, cantidadSolicitada);
            const {precio} = (inventario.precio) as PrecioEntity;

            if (uuidCupon) {
                const cuponEncontrado = await this.validarCupon(producto.uuidCupon);
                totalDescuento += this.calcularDescuento(precio, cuponEncontrado.porcentajeDescuento);
                totalAPagar += precio - this.calcularDescuento(precio, cuponEncontrado.porcentajeDescuento);

                await this.agregarProductoConCuponAlCarrito(carrito, inventario, producto, cantidadSolicitada, cuponEncontrado);
            } else {
                totalAPagar += precio;

                await this.agregarProductoAlCarrito(carrito, inventario, producto, cantidadSolicitada);
            }
        }

        await this.actualizarTotalAPagar(carrito, totalAPagar);
    }

    async eliminarDelCarrito(carritoDto: CarritoDto, uuidCarrito: string) {
        const { productos } = carritoDto;

        const carrito = await this.validarCarrito(uuidCarrito);

        const eliminarPromesas = productos.map(async (producto) => {
            const { uuidProducto } = producto;
            const productoEncontrado = await this.validarProducto(uuidProducto);
            const inventario = await this.validarInventario(productoEncontrado, producto.cantidadSolicitada);

            await this.servicioDeBaseDeDatos.detalleVenta.actualizarRegistro(inventario.id, { estado: 3 });
        });

        await Promise.all(eliminarPromesas);


    }


    async obtenerVenta(uuidCarrito: string) {
        const carrito = await this.validarCarrito(uuidCarrito);
        const detallesCarrito = await this.obtenerDetallesCarrito(carrito.id);

        return {
            carrito,
            detallesCarrito
        };
    }

    async obtenerCarritosPorEstado(estado: number) {
        return await this.obtenerCarritosConEstado(estado);
    }

    async actualizarVenta(uuidCarrito: string, confirmarVenta: boolean) {
        const carrito = await this.validarCarrito(uuidCarrito);

        if (confirmarVenta) {
            let totalAPagar = 0;
            let totalDescuento = 0;
            const detallesCarrito = await this.obtenerDetallesCarrito(carrito.id);

            for (const detalle of detallesCarrito) {
                const inventario = (detalle.inventario) as InventarioEntity;
                if (inventario.cantidadDisponible < detalle.cantidad) {
                    // @ts-ignore
                    throw new BadRequestException(`La cantidad solicitada del producto con uuid ${inventario.producto.uuid} es mayor a la cantidad disponible`);
                }

                if (detalle.cupon) {
                    const cupon = (detalle.cupon) as CuponDeDescuentoEntity;
                    const { precio } = (inventario.precio) as PrecioEntity;
                    totalDescuento += this.calcularDescuento(precio, cupon.porcentajeDescuento);
                    totalAPagar += precio - this.calcularDescuento(precio, cupon.porcentajeDescuento);

                    await this.servicioDeBaseDeDatos.cupon.actualizarRegistro(cupon.id, {
                        ...cupon,
                        cantidadUsosRealizados: cupon.cantidadUsosRealizados + 1,
                        estado: cupon.cantidadUsosRealizados + 1 === cupon.cantidadUsos ? 2 : 1,
                    });
                } else {
                    const { precio } = (inventario.precio) as PrecioEntity;
                    totalAPagar += precio;
                }

                await this.servicioDeBaseDeDatos.inventario.actualizarRegistro(inventario.id, {
                    cantidadDisponible: inventario.cantidadDisponible - detalle.cantidad,
                    cantidadVendida: inventario.cantidadVendida + detalle.cantidad,
                    estado: inventario.cantidadDisponible - detalle.cantidad === 0 ? 2 : 1,
                });
            }

            await this.servicioDeBaseDeDatos.venta.actualizarRegistro(carrito.id, { estado: 1, valorNeto: totalAPagar });
            return {
                totalPagado: totalAPagar,
                totalDescuento,
                mensaje: "Su compra ha sido confirmada exitosamente"
            }
        } else {
            await this.servicioDeBaseDeDatos.venta.actualizarRegistro(carrito.id, { estado: 2 });
            await this.actualizarEstadoProductosCarrito(carrito.id, 3);
            return {
                mensaje: "Su compra ha sido cancelada exitosamente"
            }
        }
    }


    private async actualizarEstadoProductosCarrito(idCarrito: number, nuevoEstado: number) {
        const detallesCarrito = await this.obtenerDetallesCarrito(idCarrito);
        for (const detalle of detallesCarrito) {
            await this.servicioDeBaseDeDatos.detalleVenta.actualizarRegistro(detalle.id, { estado: nuevoEstado });
        }
    }


    private async obtenerCarritosConEstado(estado: number) {
        return await this.servicioDeBaseDeDatos.venta.obtenerRegistrosPor({ estado: estado } );
    }


    private async validarCarrito(uuidCarrito: string) {
        const carrito = await this.servicioDeBaseDeDatos.venta.obtenerUnRegistroPor({ where: { uuid: uuidCarrito } }, "Venta");
        if (!carrito) {
            throw new BadRequestException(`El carrito con uuid ${uuidCarrito} no existe`);
        }
        return carrito;
    }

    private async obtenerDetallesCarrito(idCarrito: number) {
        return await this.servicioDeBaseDeDatos.detalleVenta.obtenerRegistrosPor({ venta: idCarrito },);
    }


    private async actualizarTotalAPagar(carrito, totalAPagar) {
        await this.servicioDeBaseDeDatos.venta.actualizarRegistro(carrito.id, { valorNeto: totalAPagar });
    }


    private async obtenerUsuario(idUsuario: number) {
        return await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor({ where: { id: idUsuario } }, "Usuario");
    }

    private async obtenerDireccion(esADomicilio: boolean, uuidDireccion: string) {
        if (esADomicilio && !uuidDireccion) {
            throw new BadRequestException("Si la compra es a domicilio, debe registrar una dirección de envío");
        }
        const direccion = await this.servicioDeBaseDeDatos.direccion.obtenerUnRegistroPor({ where: { uuid: uuidDireccion } }, "Direccion");
        if (!direccion) {
            throw new BadRequestException(`La dirección con uuid ${uuidDireccion} no existe`);
        }
        return direccion;
    }

    private async crearCarrito(idUsuario:number, direccion: DireccionEntity, esADomicilio: boolean, descripcion: string, observacion: string) {
        console.log("usuario", idUsuario);
        return await this.servicioDeBaseDeDatos.venta.crearRegistro({
            descripcion,
            observacion,
            envioDomicilio: esADomicilio,
            valorNeto: 0,
            usuario: idUsuario,
        });
    }

    private async validarProducto(uuidProducto: string) {
        const productoEncontrado = await this.servicioDeBaseDeDatos.producto.obtenerUnRegistroPor({ where: { uuid: uuidProducto } }, "Producto");
        if (!productoEncontrado) {
            throw new BadRequestException(`El producto con uuid ${uuidProducto} no existe`);
        }
        return productoEncontrado;
    }

    private async validarInventario(productoEncontrado, cantidadSolicitada: number) {
        const inventario = await this.servicioDeBaseDeDatos.inventario.obtenerUnRegistroPor({ where: {
                producto: productoEncontrado.id } }, "Inventario");
        if (inventario.cantidadDisponible < cantidadSolicitada) {
            throw new BadRequestException("La cantidad solicitada del producto con uuid ${productoEncontrado.uuid} es mayor a la cantidad disponible");
        }
        return inventario;
    }

    private async validarCupon(uuidCupon: string) {
        const cuponEncontrado = await this.servicioDeBaseDeDatos.cupon.obtenerUnRegistroPor({ where: { uuid: uuidCupon } }, "CuponDeDescuento");
        if (!cuponEncontrado) {
            throw new BadRequestException(`El cupón con uuid ${uuidCupon} no existe`);
        }
        if (cuponEncontrado.estado !== 1) {
            throw new BadRequestException(`El cupón con uuid ${uuidCupon} ya fue usado`);
        }
        return cuponEncontrado;
    }

    private calcularDescuento(precio: number, porcentajeDescuento: number) {
        return (precio * porcentajeDescuento) / 100;
    }

    private async agregarProductoConCuponAlCarrito(carrito, inventario, producto, cantidadSolicitada, cuponEncontrado) {
        return await this.servicioDeBaseDeDatos.detalleVenta.crearRegistro({
            venta: carrito.id,
            cantidad: cantidadSolicitada,
            descripcion: producto.descripcion,
            cupon: cuponEncontrado.id,
            observacion: producto.observacion,
            inventario: inventario.id,
            estado: 2
        });
    }

    private async agregarProductoAlCarrito(carrito, inventario, producto, cantidadSolicitada) {
        return await this.servicioDeBaseDeDatos.detalleVenta.crearRegistro({
            venta: carrito.id,
            cantidad: cantidadSolicitada,
            descripcion: producto.descripcion,
            observacion: producto.observacion,
            inventario: inventario.id,
            estado: 2
        });
    }

    private async actualizarEstadoProducto(idProducto: number, nuevoEstado: number) {
        return await this.servicioDeBaseDeDatos.detalleVenta.actualizarRegistro(idProducto, { estado: nuevoEstado });
    }

}
