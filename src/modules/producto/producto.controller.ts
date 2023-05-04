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
import {
    ActualizarCategoriaDto, ActualizarCategoriaTipoDeProductoDto,
    ActualizarProductoDto, ActualizarTipoDeProductoDto,
    CrearCategoriaDto,
    CrearCategoriaTipoProductoDto,
    CrearProductoDto,
    CrearTipoDeProductoDto
} from "./dto";
import { ProductoService } from "./producto.service";
import { ParametroEntity } from "../../frameworks/database/mysql/entities";

@ApiTags("Producto")
@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService:ProductoService) {}

    @ApiResponse({ status: 201, description: 'Registro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    crearProducto(@Body() crearDto: CrearProductoDto) {
        return this.productoService.crearRegistro(crearDto);
    }
    @ApiResponse({ status: 201, description: 'Registro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('categoria')
    crearCategoria(@Body() crearDto: CrearCategoriaDto) {
        return this.productoService.crearRegistro(crearDto);
    }

    @ApiResponse({ status: 201, description: 'Registro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('tipo_producto')
    crearTipoProducto(@Body() crearDto: CrearTipoDeProductoDto) {
        return this.productoService.crearRegistro(crearDto);
    }

    @ApiResponse({ status: 201, description: 'Registro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('asociar_tipo_categoria')
    crearTipoProductoCategoria(@Body() crearDto: CrearCategoriaTipoProductoDto) {
        return this.productoService.crearRegistro(crearDto);
    }


    @ApiResponse({ status: 201, description: 'Registros encontrados correctamente.', type: ParametroEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron parámetros.' })
    @Get('/paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    @ApiQuery({name: 'busqueda', required: false, type: String})
    @ApiQuery({name: 'campo', required: false, type: String})
    obtenerRegistrosPaginados(@Query() parametrosPaginado) {
        let {limite, pagina, busqueda, campo} = parametrosPaginado;
        limite = limite ? limite: 100;
        pagina = pagina ? pagina: 2;
        return this.productoService.obtenerRegistrosPaginados(limite, pagina, busqueda, campo);
    }


    @ApiResponse({ status: 201, description: 'Registros encontrados correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron parámetros.' })
    @Get()
    @ApiQuery({name: 'entidad', required: false, type: String, description: 'Nombre de la entidad a consultar. Solo se permite el valor "producto", "categoria", "tipo_de_producto" y "categoria_tipo_producto"'})
    obtenerRegistros(@Query() parametrosConsulta) {
        let {entidad} = parametrosConsulta;
        return this.productoService.obtenerTodosLosRegistros(entidad);
    }

    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch('categoria/:uuid')
    actualizarCategoria(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarDto:ActualizarCategoriaDto) {
        return this.productoService.actualizarRegistro(uuid, actualizarDto);
    }

    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch('tipo_producto/:uuid')
    actualizarTipoProducto(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarDto:ActualizarTipoDeProductoDto) {
        return this.productoService.actualizarRegistro(uuid, actualizarDto);
    }

    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch('tipo_producto_categoria:uuid')
    actualizarTipoProductoCategoria(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarDto:ActualizarCategoriaTipoDeProductoDto) {
        return this.productoService.actualizarRegistro(uuid, actualizarDto);
    }

    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Patch('/:uuid')
    actualizarProducto(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarDto:ActualizarProductoDto) {
        return this.productoService.actualizarRegistro(uuid, actualizarDto);
    }
    
    
}
