import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
  imports: [MySQLDatabaseModule]
})
export class UsuarioModule {}
