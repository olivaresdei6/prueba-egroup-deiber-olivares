import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { InventarioEntity } from "../../frameworks/database/mysql/entities";
import { Auth } from "../../decorators/auth.decorator";
import { ActualizarInventarioDto } from "./dto/actualizar-inventario.dto";
import { CrearInventarioDto } from "./dto/crear-inventario.dto";
import { InventarioService } from "./inventario.service";

@ApiTags("Inventarios")
@Controller('inventario')
@Auth()
export class InventarioController {
    constructor(private readonly inventarioService: InventarioService) {}

    @ApiResponse({ status: 201, description: 'Inventario creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    crearRegistro(@Body() crearInventarioDto: CrearInventarioDto) {
        return this.inventarioService.crearRegistro(crearInventarioDto);
    }


    @ApiResponse({ status: 201, description: 'Inventarios encontrados correctamente.', type: InventarioEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Inventario no existe.' })
    @Get()
    obtenerTodosLosRegistros(): Promise<InventarioEntity[]>  {
        return this.inventarioService.obtenerTodosLosRegistros();
    }

    @ApiResponse({ status: 201, description: 'Inventario encontrado correctamente.', type: InventarioEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Inventario no existe.' })
    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid): Promise<InventarioEntity>  {
        return this.inventarioService.obtenerUnRegistro(uuid)
    }



    @ApiResponse({ status: 201, description: 'Inventario actualizado correctamente.', type: InventarioEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Inventario no existe.' })
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid, @Body() actualizarInventarioDto: ActualizarInventarioDto) {
        return this.inventarioService.actualizarRegistro(uuid, actualizarInventarioDto);
    }
}
