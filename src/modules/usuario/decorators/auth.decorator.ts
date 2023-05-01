import {applyDecorators, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UsuarioRolGuard} from "../guards/usuario-rol-guard.service";

export const Auth = () => {
    return  applyDecorators(
        UseGuards(AuthGuard('jwt'),
            UsuarioRolGuard
        )
    )
}
