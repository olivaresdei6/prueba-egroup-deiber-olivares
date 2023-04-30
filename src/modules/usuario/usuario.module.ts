import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { MailModule } from "../../frameworks/mails/mail.module";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService],
    imports: [
        MySQLDatabaseModule,
        MailModule
    ]
})
export class UsuarioModule {}
