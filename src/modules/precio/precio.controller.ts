import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    UseInterceptors
} from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrecioEntity } from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { Auth } from "../../decorators/auth.decorator";
import { CrearPrecioDto } from "./dto/crear-precio.dto";
import { PrecioService } from "./precio.service";
import { ActualizarPrecioDto } from "./dto/actualizar-precio.dto";

@ApiTags("Precios")
@Controller('precio')
@Auth()
export class PrecioController {
    constructor(private readonly precioService: PrecioService) {}

    @ApiResponse({ status: 201, description: 'Precio creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    crearRegistro(@Body() crearPrecioDto: CrearPrecioDto) {
        return this.precioService.crearRegistro(crearPrecioDto);
    }


    @ApiResponse({ status: 201, description: 'Precios encontrado correctamente.', type: PrecioEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Precio no existe.' })
    @Get()
    obtenerTodosLosRegistros(): Promise<PrecioEntity[]>  {
        return this.precioService.obtenerTodosLosRegistros();
    }

    @ApiResponse({ status: 201, description: 'Precios encontrados correctamente.', type: PrecioEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron precios.' })
    @Get('/paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    obtenerRegistrosPaginados(@Query() parametrosConsulta) {
        const {limite, pagina} = parametrosConsulta;
        return this.precioService.obtenerRegistrosPaginados(limite, pagina);
    }


    @ApiResponse({ status: 201, description: 'Precio encontrado correctamente.', type: PrecioEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El precio no existe.' })
    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid): Promise<PrecioEntity>  {
        return this.precioService.obtenerUnRegistro(uuid)
    }



    @ApiResponse({ status: 201, description: 'Precio actualizado correctamente.', type: PrecioEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El precio no existe.' })
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid, @Body() actualizarPrecioDto: ActualizarPrecioDto) {
        return this.precioService.actualizarRegistro(uuid, actualizarPrecioDto);
    }
}
