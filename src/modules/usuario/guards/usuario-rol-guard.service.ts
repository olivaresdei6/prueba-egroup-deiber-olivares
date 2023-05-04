import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { IConexionDb } from "../../../frameworks/database/mysql/core/abstract";
import { PermisoRolEntity, UsuarioEntity } from "../../../frameworks/database/mysql/entities";
import { ResultadoParametrosDeUnaRuta } from "../../../frameworks/database/mysql/core/interfaces/permisoInterface";

@Injectable()
export class UsuarioRolGuard implements CanActivate {
    constructor(private readonly servicioDeBaseDeDatos: IConexionDb) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const parametros = Object.keys(context.switchToHttp().getRequest().params);
        const querys  = Object.keys(context.switchToHttp().getRequest().query);
        const usuario: UsuarioEntity = this.obtenerUsuarioAutenticado(context);
        const token: string = this.obtenerTokenDeLaSolicitud(context);
        const metodo: string = this.obtenerElMetodoDeLaSolicitud(context);
        const ruta: string = this.obtenerLaRutaSolicitada(context);
        const rolId: number = await this.obtenerElUuidDelRol(usuario);
        const permisos: ResultadoParametrosDeUnaRuta[] = await this.obtenerPermisosDelUsuario(rolId);
        const isTokenValido: boolean = await this.validarToken(token, usuario);
        if (isTokenValido && this.verificarSolicitud(permisos, metodo, ruta, parametros, querys)) {
            return true;
        }

        throw new UnauthorizedException('No tienes permisos para acceder a este recurso');

    }

    private obtenerUsuarioAutenticado(context: ExecutionContext): UsuarioEntity {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }

    private obtenerTokenDeLaSolicitud(context: ExecutionContext): string {
        console.log(context.switchToHttp().getRequest());
        const request = context.switchToHttp().getRequest();
        return request.rawHeaders[3].split(' ')[1] || request.rawHeaders[1].split(' ')[1];
    }

    private obtenerElMetodoDeLaSolicitud(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();
        return request.method;
    }

    private obtenerLaRutaSolicitada(context: ExecutionContext): string {
        const querys  = Object.keys(context.switchToHttp().getRequest().query);
        const parametros = Object.keys(context.switchToHttp().getRequest().params);
        let url = context.switchToHttp().getRequest()._parsedUrl.pathname;
        if (querys.length > 0) {
            return url.split('?')[0];
        }
        else if (parametros.length > 0) {
            return context.switchToHttp().getRequest().route.path.replace(':uuid', '');
        }
        return url+'/';
    }

    private async obtenerElUuidDelRol(usuario: UsuarioEntity): Promise<number> {
        const rol = (await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor(
            { where: { uuid: usuario.uuid } },
            'Usuario',
        )).rol as PermisoRolEntity;

        if (!rol) {
            throw new UnauthorizedException({
                message: 'No tienes permisos para acceder a este recurso',
            });
        }

        return rol.id;
    }

    private async obtenerPermisosDelUsuario(roleId: number): Promise<ResultadoParametrosDeUnaRuta[]> {
        return await this.servicioDeBaseDeDatos.permiso.obtenerPermisos(+roleId);
    }

    private async validarToken(token: string, usuario: UsuarioEntity): Promise<boolean> {
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
        return Boolean(registroDeAcceso && fechaDeExpiracionDelToken > new Date());
    }

    private verificarSolicitud(permisos: ResultadoParametrosDeUnaRuta[], metodoHttp: string, ruta: string, parametros: string[], queries: string[]): boolean {
        const permiso = permisos.find(permiso => {
            console.log('RUTA SOLICITADA', ruta, metodoHttp, parametros);
            console.log('RUTA PERMITIDA', permiso.ruta, permiso.metodoHttp, permiso.parametros);
            console.log('SON IGUALES', permiso.ruta === ruta && permiso.metodoHttp === metodoHttp && parametros.length <= permiso.parametros.length);
            console.log('======================================================================================================');
            console.log('======================================================================================================');
            return permiso.ruta === ruta && permiso.metodoHttp === metodoHttp && parametros.length <= permiso.parametros.length
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
        return true;
    }
}
