import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query, UseInterceptors
} from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { Auth } from "../usuario/decorators/auth.decorator";
import {
    ActualizarCiudadDto,
    ActualizarDepartamentoDto, ActualizarDireccionDto, ActualizarPaisDto,
    CrearCiudadDto,
    CrearDepartamentoDto,
    CrearDireccionDto,
    CrearPaisDto
} from "./dto";
import { DireccionService } from "./direccion.service";

@ApiTags("Direccion")
@Controller('direccion')
export class DireccionController {
    constructor(private readonly direccionService:DireccionService) {}

    @ApiResponse({ status: 201, description: 'Registro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    crearDireccion(@Body() crearDto: CrearDireccionDto) {
        return this.direccionService.crearRegistro(crearDto);
    }
    @ApiResponse({ status: 201, description: 'Registro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('pais')
    crearPais(@Body() crearDto: CrearPaisDto) {
        return this.direccionService.crearRegistro(crearDto);
    }

    @ApiResponse({ status: 201, description: 'Registro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('ciudad')
    crearCiudad(@Body() crearDto: CrearCiudadDto) {
        return this.direccionService.crearRegistro(crearDto);
    }

    @ApiResponse({ status: 201, description: 'Registro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('departamento')
    crearDepartamento(@Body() crearDto: CrearDepartamentoDto) {
        return this.direccionService.crearRegistro(crearDto);
    }

    @ApiResponse({ status: 201, description: 'Registros encontrados correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron parámetros.' })
    @Get()
    @ApiQuery({name: 'entidad', required: false, type: String})
    obtenerRegistros(@Query() parametrosConsulta) {
        let {entidad} = parametrosConsulta;
        return this.direccionService.obtenerRegistros(entidad);
    }
    
    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch('/ciudad/:uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarDto:ActualizarCiudadDto) {
        return this.direccionService.actualizarRegistro(uuid, actualizarDto);
    }

    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch('/departamento:uuid')
    actualizarDepartamento(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarDto:ActualizarDepartamentoDto) {
        return this.direccionService.actualizarRegistro(uuid, actualizarDto);
    }

    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch('pais/:uuid')
    actualizarPais(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarDto:ActualizarPaisDto) {
        return this.direccionService.actualizarRegistro(uuid, actualizarDto);
    }

    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch(':uuid')
    actualizarDireccion(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarDto:ActualizarDireccionDto) {
        return this.direccionService.actualizarRegistro(uuid, actualizarDto);
    }
    
    
}
