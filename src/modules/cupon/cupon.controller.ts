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
import {
    CuponDeDescuentoEntity,
} from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { ActualizarCuponDto } from "./dto/actualizar-cupon.dto";
import { CrearCuponDto } from "./dto/crear-cupon.dto";
import { CuponService } from "./cupon.service";
import { Auth } from "../../decorators/auth.decorator";

@ApiTags("Cupones")
@Controller('cupon')
@Auth()
export class CuponController {
    constructor(private readonly cuponService: CuponService) {}

    @ApiResponse({ status: 201, description: 'Cupon creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    crearRegistro(@Body() crearCuponDto: CrearCuponDto) {
        return this.cuponService.crearRegistro(crearCuponDto);
    }


    @ApiResponse({ status: 201, description: 'Cupones encontrado correctamente.', type: CuponDeDescuentoEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Cupon no existe.' })
    @Get()
    obtenerTodosLosRegistros(): Promise<CuponDeDescuentoEntity[]>  {
        return this.cuponService.obtenerTodosLosRegistros();
    }

    @ApiResponse({ status: 201, description: 'Cupones encontrados correctamente.', type: CuponDeDescuentoEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron cupones.' })
    @Get('/paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    @ApiQuery({name: 'busqueda', required: false, type: String})
    @ApiQuery({name: 'campo', required: false, type: String})
    obtenerRegistrosPaginados(@Query() parametrosConsulta) {
        const {limite, pagina, busqueda, campo} = parametrosConsulta;
        return this.cuponService.obtenerRegistrosPaginados(limite, pagina, busqueda, campo);
    }


    @ApiResponse({ status: 201, description: 'Cupon encontrado correctamente.', type: CuponDeDescuentoEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El cupon no existe.' })
    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid): Promise<CuponDeDescuentoEntity>  {
        return this.cuponService.obtenerUnRegistro(uuid)
    }



    @ApiResponse({ status: 201, description: 'Cupon actualizado correctamente.', type: CuponDeDescuentoEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El cupon no existe.' })
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid, @Body() actualizarCuponDto: ActualizarCuponDto) {
        return this.cuponService.actualizarRegistro(uuid, actualizarCuponDto);
    }
}
