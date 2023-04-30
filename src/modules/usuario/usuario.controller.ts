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
import { UsuarioEntity } from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { UsuarioService } from "./usuario.service";
import { ActualizarUsuarioDto, CrearUsuarioDto, LoginUsuarioDto } from "./dto";
import { roles } from "./objects/roles";

@ApiTags("Usuario")
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}
    
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    registrarCliente(@Body() crearParametroDto: CrearUsuarioDto){
        return this.usuarioService.registrarUsuario(crearParametroDto, roles.usuarioCliente);
    }

    @ApiResponse({ status: 201, description: 'Usuario creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('login')
    iniciarSesion(@Body() loginUsuarioDto: LoginUsuarioDto){
        return this.usuarioService.iniciarSesion(loginUsuarioDto);
    }

    @ApiResponse({ status: 201, description: 'Usuario creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('administrador')
    registrarAdministrador(@Body() crearParametroDto: CrearUsuarioDto){
        return this.usuarioService.registrarUsuario(crearParametroDto, roles.usuarioAdministrador);
    }

    @ApiResponse({ status: 201, description: 'Usuario creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    registrarDesarrollador(@Body() crearParametroDto: CrearUsuarioDto){
        return this.usuarioService.registrarUsuario(crearParametroDto, roles.usuarioDesarrollador);
    }
    
    
    @ApiResponse({ status: 201, description: 'Usuarios encontrados correctamente.', type: UsuarioEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron usuarios registrados' })
    @Get()
    obtenerTodosLosUsuarios()  {
        return this.usuarioService.obtenerTodosLosUsuarios();
    }

    @ApiResponse({ status: 201, description: 'Usuarios encontrados correctamente.', type: UsuarioEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron usuarios registrados' })
    @Get('paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    @ApiQuery({name: 'busqueda', required: false, type: String})
    @ApiQuery({name: 'campo', required: false, type: String})
    obtenerUsuariosPaginados(@Query() parametrosConsulta) {
        const {limite, pagina, busqueda, campo} = parametrosConsulta;
        return this.usuarioService.obtenerUsuariosPaginados(limite, pagina, busqueda, campo);
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Usuario encontrado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El usuario no existe.' })
    @Get(':uuid')
    obtenerUnUsuario(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.usuarioService.obtenerUnUsuario(uuid);
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Usuario actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El usuario no existe.' })
    @Patch(':uuid')
    actualizarUsuario(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarUsuarioDto: ActualizarUsuarioDto) {
        return this.usuarioService.actualizarRegistro(uuid, actualizarUsuarioDto);
    }
    
    
}
