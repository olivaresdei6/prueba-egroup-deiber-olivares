import { createParamDecorator, ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";

export const GetUser = createParamDecorator(
    ( data, ctx:ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const usuario = req.user
        console.log(usuario);
        if (!usuario) {
            throw new ForbiddenException('Usuario no autenticado');
        }
        return (!data) ? usuario : usuario[data];
    }
)
