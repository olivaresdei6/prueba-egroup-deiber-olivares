import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { IConexionDb } from "../frameworks/database/mysql/core/abstract";
import { PermisoRolEntity, UsuarioEntity } from "../frameworks/database/mysql/entities";
import { ResultadoParametrosDeUnaRuta } from "../frameworks/database/mysql/core/interfaces/permisoInterface";

@Injectable()
export class AuthUsuarioGuard implements CanActivate {
    constructor(private readonly servicioDeBaseDeDatos: IConexionDb) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log(context.switchToHttp().getRequest());
        const parametros = Object.keys(context.switchToHttp().getRequest().params);
        console.log('Pase por los parametros', parametros);
        const querys  = Object.keys(context.switchToHttp().getRequest().query);
        console.log('Pase por los querys', querys);
        const usuario: UsuarioEntity = this.obtenerUsuarioAutenticado(context);
        console.log('Pase por el usuario', usuario);
        const token: string = this.obtenerTokenDeLaSolicitud(context);
        console.log('Pase por el token', token);
        const metodo: string = this.obtenerElMetodoDeLaSolicitud(context);
        console.log('Pase por el metodo', metodo);
        const ruta: string = this.obtenerLaRutaSolicitada(context);
        console.log('Pase por la ruta', ruta);
        console.log('Usuario con su rol: ', usuario);
        const rolId = await this.obtenerElUuidDelRol(usuario);
        console.log('Pase por el rolId', rolId);
        //@ts-ignore
        const permisos = await this.obtenerPermisosDelUsuario(usuario.rol.id);
        console.log('Pase por los permisos', permisos);
        const isTokenValido = await this.validarToken(token, usuario);
        console.log('Pase por el isTokenValido', isTokenValido);
        console.log('Pase por los permisos', permisos);
        console.log('Pase por el rolId', rolId);
        console.log('Pase por el isTokenValido', isTokenValido);
        if (isTokenValido && this.verificarSolicitud(permisos, metodo, ruta, parametros, querys)) {
            return true;
        }
        console.log('No pase por nada');
        throw new UnauthorizedException('No tienes permisos para acceder a este recurso');
    }

    private obtenerUsuarioAutenticado(context: ExecutionContext): UsuarioEntity {
        console.log('Método obtenerUsuarioAutenticado');
        const request = context.switchToHttp().getRequest();
        console.log('Esto es la request del método obtenerUsuarioAutenticado', request);
        return request.user;
    }

    private obtenerTokenDeLaSolicitud(context: ExecutionContext): string {
        console.log('Método obtenerTokenDeLaSolicitud');
        const request = context.switchToHttp().getRequest();
        console.log('Esto es la request del método obtenerTokenDeLaSolicitud', request);
        const token = request.rawHeaders[3].split(' ')[1] || request.rawHeaders[1].split(' ')[1];
        console.log('Esto es el token del método obtenerTokenDeLaSolicitud', token);
        return token;
    }

    private obtenerElMetodoDeLaSolicitud(context: ExecutionContext): string {
        console.log('Método obtenerElMetodoDeLaSolicitud');
        const request = context.switchToHttp().getRequest();
        console.log('Esto es la request del método obtenerElMetodoDeLaSolicitud', request);
        return request.method;
    }

    private obtenerLaRutaSolicitada(context: ExecutionContext): string {
        console.log('Método obtenerLaRutaSolicitada');
        const querys  = Object.keys(context.switchToHttp().getRequest().query);
        const parametros = Object.keys(context.switchToHttp().getRequest().params);
        let url = context.switchToHttp().getRequest()._parsedUrl.pathname;
        if (querys.length > 0) {
            return url.split('?')[0];
        }
        else if (parametros.length > 0) {
            return context.switchToHttp().getRequest().route.path.replace('/:uuid', '');
        }
        console.log('Esto es la url del método obtenerLaRutaSolicitada', url);
        return url;
    }

    private async obtenerElUuidDelRol(usuario: UsuarioEntity): Promise<number> {
        console.log('Método obtenerElUuidDelRol');
        const rol = (await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor(
            { where: { uuid: usuario.uuid } },
            'Usuario',
        )).rol as PermisoRolEntity;

        if (!rol) {
            throw new UnauthorizedException({
                message: 'No tienes permisos para acceder a este recurso',
            });
        }
        console.log('Esto es el rol del método obtenerElUuidDelRol', rol);
        return rol.id;
    }

    private async obtenerPermisosDelUsuario(roleId: number): Promise<ResultadoParametrosDeUnaRuta[]> {
        console.log('Método obtenerPermisosDelUsuario');
        const permisos =  await this.servicioDeBaseDeDatos.permiso.obtenerPermisos(+roleId);
        console.log('Esto es el permiso del método obtenerPermisosDelUsuario', permisos);
        return permisos;
    }

    private async validarToken(token: string, usuario: UsuarioEntity): Promise<boolean> {
        console.log('Metodo validarToken');
        const registroDeAcceso = await this.servicioDeBaseDeDatos.registroDeAcceso.obtenerUnRegistroPor(
            { where: { token } },
            'Token',
        );
        // @ts-ignore
        const existUsuario = parseInt(registroDeAcceso.usuario.id) === parseInt(usuario.id);

        if (!existUsuario) {
            throw new UnauthorizedException({
                message: 'No tienes permisos para acceder a este recurso',
            });
        }
        const fechaDeExpiracionDelToken = new Date(registroDeAcceso.fechaDeExpiracionToken);
        console.log('Esto es el registroDeAcceso del método validarToken', registroDeAcceso);
        return Boolean(registroDeAcceso && fechaDeExpiracionDelToken > new Date());
    }

    private verificarSolicitud(permisos: ResultadoParametrosDeUnaRuta[], metodoHttp: string, ruta: string, parametros: string[], queries: string[]): boolean {
        console.log('Metodo verificarSolicitud');

        const permiso = permisos.find(permiso => {
            if (parametros.length > 0) {
                return permiso.ruta === ruta && permiso.metodoHttp === metodoHttp && permiso.parametros.length === parametros.length;
            }
            if (queries.length > 0) {
                return permiso.ruta === ruta && permiso.metodoHttp === metodoHttp && queries.length <= permiso.parametros.length;
            }
            return permiso.ruta === ruta && permiso.metodoHttp === metodoHttp && permiso.parametros.length === 0;
        });
        if (!permiso) return false;
        if (queries.length > 0) {
            for (const query of queries) {
                let isParametroValido = false;
                if (!permiso.parametros.some(parametroRegistrado => parametroRegistrado.nombre === query)) {
                    isParametroValido = false;
                    break;
                }
            }
        }
        else {
            for (const parametro of permiso.parametros) {
                let isParametroValido = false;
                if (!queries.some(query => query === parametro.nombre)) {
                    isParametroValido = false;
                    break;
                }
            }
        }
        console.log('Esto es el permiso del método verificarSolicitud', permiso);
        return true;
    }
}
