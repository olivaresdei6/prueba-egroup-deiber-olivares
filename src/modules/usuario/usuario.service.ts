import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { ParametroEntity, UsuarioEntity } from "../../frameworks/database/mysql/entities";
import * as bcrypt from "bcrypt";
import { ActualizarUsuarioDto, CrearUsuarioDto, LoginUsuarioDto } from "./dto";
import { generateCodeAuth } from "../../helper/generateCodeAuth";

@Injectable()
export class UsuarioService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}
    
    
    async registrarUsuario(crearUsuarioDto: CrearUsuarioDto, rol: string)  {
        const {password} = crearUsuarioDto;
        // Encripto la contraseña
        const salt = await bcrypt.genSalt( 10 );
        const passwordEncriptada = await bcrypt.hash( password, salt );
        const tipoUsuario =  await this.servicioDeBaseDeDatos.permisoRol.obtenerUnRegistroPor(
            {where: {nombre: rol}}, 'Rol',
        );
        await this.servicioDeBaseDeDatos.usuario.crearRegistro({
            ...crearUsuarioDto, password: passwordEncriptada, rol: tipoUsuario, codigoAutenticacion: generateCodeAuth()
        });
        return {
            status: 201,
            message: 'Usuario creado correctamente',
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
