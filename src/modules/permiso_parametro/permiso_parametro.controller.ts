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
import { PermisoParametroEntity } from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { ActualizarPermisoParametroDto } from "./dto/actualizar-permiso-parametro.dto";
import { CrearPermisoParametroDto } from "./dto/crear-permiso-parametro.dto";
import { PermisoParametroService } from "./permiso_parametro.service";
import { Auth } from "../usuario/decorators/auth.decorator";

@ApiTags("Permiso - parametros de rutas")
@Controller('permiso_parametro')
@Auth()
export class PermisoParametroController {
    constructor(private readonly permisoParametroService: PermisoParametroService) {}

    @ApiResponse({ status: 201, description: 'Permiso de ruta creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    crearRegistro(@Body() crearPermisoParametroDto: CrearPermisoParametroDto) {
        return this.permisoParametroService.crearRegistro(crearPermisoParametroDto);
    }


    @ApiResponse({ status: 201, description: 'Permisos de rutas encontrados correctamente.', type: PermisoParametroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: Permisos de rutas no encontrados.' })
    @Get()
    obtenerTodosLosRegistros()  {
        return this.permisoParametroService.obtenerTodosLosRegistros();
    }

    @ApiResponse({ status: 201, description: 'Permisos de rutas encontrados correctamente.', type: PermisoParametroEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron Permisos de rutas.' })
    @Get('/paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    @ApiQuery({name: 'busqueda', required: false, type: String})
    @ApiQuery({name: 'campo', required: false, type: String})
    obtenerRegistrosPaginados(@Query() parametrosConsulta) {
        const {limite, pagina, busqueda, campo} = parametrosConsulta;
        return this.permisoParametroService.obtenerRegistrosPaginados(limite, pagina, busqueda, campo);
    }


    @ApiResponse({ status: 201, description: 'Permiso de ruta encontrado correctamente.', type: PermisoParametroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: Permiso de ruta no existe.' })
    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid) {
        return this.permisoParametroService.obtenerUnRegistro(uuid)
    }



    @ApiResponse({ status: 201, description: 'Permiso de ruta actualizado correctamente.', type: PermisoParametroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Permiso de ruta no existe.' })
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid, @Body() actualizarPermisoParametroDto: ActualizarPermisoParametroDto) {
        return this.permisoParametroService.actualizarRegistro(uuid, actualizarPermisoParametroDto);
    }
}
