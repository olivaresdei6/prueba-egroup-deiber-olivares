import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { ParametroEntity, UsuarioEntity } from "../../frameworks/database/mysql/entities";
import * as bcrypt from "bcrypt";
import { ActualizarUsuarioDto, CrearUsuarioDto, LoginUsuarioDto } from "./dto";
import { generateCodeAuth } from "../../helper/generateCodeAuth";
import { MailerService } from "@nestjs-modules/mailer";
import { MailService } from "../../frameworks/mails/mail.service";

@Injectable()
export class UsuarioService {
    constructor(
        private readonly servicioDeBaseDeDatos: IConexionDb,
        private readonly mailerService: MailerService,
        private readonly emailService: MailService,


    ) {}
    
    
    async registrarUsuario(crearUsuarioDto: CrearUsuarioDto, rol: string)  {
        const {password} = crearUsuarioDto;
        const codigoAutenticacion = generateCodeAuth();
        // Encripto la contraseña
        const salt = await bcrypt.genSalt( 10 );
        const passwordEncriptada = await bcrypt.hash( password, salt );
        const tipoUsuario =  await this.servicioDeBaseDeDatos.permisoRol.obtenerUnRegistroPor(
            {where: {nombre: rol}}, 'Rol',
        );
        await this.servicioDeBaseDeDatos.usuario.crearRegistro({
            ...crearUsuarioDto, password: passwordEncriptada, rol: tipoUsuario, codigoAutenticacion
        });
        const isSendEmail = await this.emailService.userMail.sendConfirmationEmail(crearUsuarioDto.correo, crearUsuarioDto.nombre, codigoAutenticacion, this.mailerService);
        if (isSendEmail) {
            return {
                status: 201,
                message: 'Usuario creado correctamente. Revisa mailtrap para activar tu cuenta',
            }
        }

    }

    async activarCuenta(codigoAutenticacion: string) {
        const usuario = await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor(
            {where: {codigoAutenticacion}}, 'Usuario',
        );
        if (!usuario) {
            throw new NotFoundException('No se encontro un usuario en el sistema con los datos ingresados');
        }
        const {uuid} = usuario;
        await this.servicioDeBaseDeDatos.usuario.actualizarRegistro(uuid, {estaActivo: true, codigoAutenticacion: generateCodeAuth()});
        return {
            status: 200,
            message: 'Cuenta activada correctamente. Se realiza una peticion get, no es lo ideal, pero no alcanze a hacer el front la expongo directamente aunque lo ideal seria que en el correo se enviara un link con el codigo de autenticacion y se redirigiera a la pagina de login',
        }
    }

    async iniciarSesion({correo, password}: LoginUsuarioDto) {
        const usuarioEncontrado = await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor(
            {where: {correo}}, 'Usuario',
        );
        console.log(usuarioEncontrado);
        if (!usuarioEncontrado) {
            throw new NotFoundException('No se encontro un usuario en el sistema con los datos ingresados');
        }
        const {password: passwordUsuario, uuid} = usuarioEncontrado;
        const passwordValida = await bcrypt.compare(password, passwordUsuario);
        if (!passwordValida) {
            throw new NotFoundException('No se encontro un usuario en el sistema con los datos ingresados')
        }

        if (usuarioEncontrado.estaActivo === false) {
            throw new ForbiddenException('El usuario no esta activo en el sistema. Por favor revise su correo para activar su cuenta')
        }
        return {
            status: 200,
            message: 'Inicio de sesión correcto',
            data: {
                uuid,
            }
        }
    }
    
    async obtenerTodosLosUsuarios() {
        const usuarios =  await this.servicioDeBaseDeDatos.usuario.obtenerRegistros();
        return usuarios.map(usuario => {
            const {password, ...resto} = usuario;
            return resto;
        });
    }

    async obtenerUsuariosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        const camposPermitidos = [ 'nombre', 'apellido', 'correo', 'telefono' ];
        if (campo && !camposPermitidos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido');
        }
        if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.usuario.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.usuario.obtenerRegistrosPaginados({limite, pagina});
        }
    }
    
    async obtenerUnUsuario(uuid: string): Promise<ParametroEntity> {
        return await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor({where: {uuid}}, 'Parámetro');
    }
    
    async actualizarRegistro(uuid: string, actualizarUsuarioDto: ActualizarUsuarioDto)  {
        const {password} = actualizarUsuarioDto;
        if (password) {
            const salt = await bcrypt.genSalt( 10 );
            actualizarUsuarioDto.password = await bcrypt.hash(password, salt);
        }
        await this.servicioDeBaseDeDatos.usuario.actualizarRegistro(uuid, actualizarUsuarioDto);
    }
}
