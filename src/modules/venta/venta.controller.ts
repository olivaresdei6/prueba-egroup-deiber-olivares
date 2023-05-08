import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post, Req
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "../../decorators/auth.decorator";
import { VentaService } from "./venta.service";
import { CarritoDto } from "./dto/carrito.dto";
import { EstadosUnum } from "./enum/estados.unum";

@ApiTags("Ventas")
@Controller('venta')
@Auth()
export class VentaController {
    constructor(private readonly ventaService: VentaService) {}

    @ApiResponse({ status: 201, description: 'Carrito creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('agregar_al_carrito')
    agregarCarrito(@Req() req, @Body() carritoDto: CarritoDto) {
        const idUsuario = +(req.user.id);
        console.log('ID Del usduario', idUsuario);
        return this.ventaService.agregarAlCarrito(carritoDto, idUsuario)
    }


    @ApiResponse({ status: 201, description: 'Productos eliminados del carrito correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Patch('eliminar_del_carrito/:uuid')
    eliminarDelCarrito(@Body() carritoDto: CarritoDto, @Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.ventaService.eliminarDelCarrito(carritoDto, uuid)
    }


    @ApiResponse({ status: 201, description: 'Venta encontrada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: La venta no existe.' })
    @Get(':uuid')
    obtenerVenta(@Param('uuid', ParseUUIDPipe) uuid)  {
        return this.ventaService.obtenerVenta(uuid);
    }

    @ApiResponse({ status: 201, description: 'Venta confirmada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: La venta no existe.' })
    @Patch('confirmar/:uuid')
    confirmarVenta(@Param('uuid', ParseUUIDPipe) uuid)  {
        return this.ventaService.actualizarVenta(uuid, true);
    }

    @ApiResponse({ status: 201, description: 'Venta cancelada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: La venta no existe.' })
    @Patch('cancelar/:uuid')
    cancelarVenta(@Param('uuid', ParseUUIDPipe) uuid)  {
        return this.ventaService.actualizarVenta(uuid, false);
    }

    @ApiResponse({ status: 201, description: 'Ventas encontradas correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron ventas en proceso.' })
    @Get('en_proceso')
    obtenerVentasEnProceso()  {
        return this.ventaService.obtenerCarritosPorEstado(EstadosUnum.enProcesoDeVenta);
    }

    @ApiResponse({ status: 201, description: 'Ventas encontradas correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron ventas canceladas.' })
    @Get('canceladas')
    obtenerVentasCanceladas()  {
        return this.ventaService.obtenerCarritosPorEstado(EstadosUnum.cancelado);
    }

    @ApiResponse({ status: 201, description: 'Ventas encontradas correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron ventas en realizadas.' })
    @Get('realizadas')
    obtenerVentasRealizadas()  {
        return this.ventaService.obtenerCarritosPorEstado(EstadosUnum.vendido);
    }

    @ApiResponse({ status: 201, description: 'Ventas encontradas correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron activas en realizadas.' })
    @Get('activas')
    obtenerVentasActivas()  {
        return this.ventaService.obtenerCarritosPorEstado(EstadosUnum.activo);
    }

}
