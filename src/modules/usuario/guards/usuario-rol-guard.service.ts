import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { IConexionDb } from "../../../frameworks/database/mysql/core/abstract";
import { PermisoRolEntity, UsuarioEntity } from "../../../frameworks/database/mysql/entities";
import { ResultadoParametrosDeUnaRuta } from "../../../frameworks/database/mysql/core/interfaces/permisoInterface";

@Injectable()
export class UsuarioRolGuard implements CanActivate {
    constructor(private readonly servicioDeBaseDeDatos: IConexionDb) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Para extraer las llaves de un objeto
        const parametros = Object.keys(context.switchToHttp().getRequest().query);
        const usuario: UsuarioEntity = this.obtenerUsuarioAutenticado(context);
        const token: string = this.obtenerTokenDeLaSolicitud(context);
        const metodo: string = this.obtenerElMetodoDeLaSolicitud(context);
        const ruta: string = this.obtenerLaRutaSolicitada(context);
        const rolId: number = await this.obtenerElUuidDelRol(usuario);
        const permisos: ResultadoParametrosDeUnaRuta[] = await this.obtenerPermisosDelUsuario(rolId);
        const isTokenValido: boolean = await this.validarToken(token, usuario);

        if (isTokenValido && this.verificarSolicitud(permisos, metodo, ruta, parametros)) {
            return true;
        }

        throw new UnauthorizedException('No tienes permisos para acceder a este recurso');

    }

    private obtenerUsuarioAutenticado(context: ExecutionContext): UsuarioEntity {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }

    private obtenerTokenDeLaSolicitud(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();
        return request.rawHeaders[1].split(' ')[1];
    }

    private obtenerElMetodoDeLaSolicitud(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();
        return request.method;
    }

    private obtenerLaRutaSolicitada(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();
        return request.route.path;
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

    private verificarSolicitud(permisos: ResultadoParametrosDeUnaRuta[], metodoHttp: string, ruta: string, parametros: string[]): boolean {
        parametros = parametros.length === 0 ? [ruta.split('/:')[1]] : parametros ;
        ruta = ruta.includes('/:') ? ruta.split('/:')[0] : ruta;
        const permiso = permisos.find(permiso => permiso.ruta === ruta && permiso.metodoHttp === metodoHttp && parametros.length <= permiso.parametros.length);
        if (!permiso) return false;

        for (const parametro of parametros) {
            let isParametroValido = false;
            if (!permiso.parametros.some(parametroRegistrado => parametroRegistrado.nombre === parametro)) {
                isParametroValido = false;
                break;
            }
        }

        return true;
    }
}
