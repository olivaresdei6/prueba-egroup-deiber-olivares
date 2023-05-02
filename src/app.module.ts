import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLDatabaseModule } from "./frameworks/database/mysql/mysql.module";
import { ParametroModule } from "./modules/parametro/parametro.module";
import { ValorParametroModule } from "./modules/valor_parametro/valor_parametro.module";
import { ConfigModule } from "@nestjs/config";
import { envConfiguration } from "./config/env.config";
import { JoiValidationSchema } from "./config/joi.validation";
import { PermisoModuloModule } from "./modules/permiso_modulo/permiso_modulo.module";
import { PermisoParametroModule } from "./modules/permiso_parametro/permiso_parametro.module";
import { PermisoRutaModule } from "./modules/permiso_ruta/permiso_ruta.module";
import { PermisoRolModule } from "./modules/permiso_rol/permiso_rol.module";
import { PermisoModule } from "./modules/permiso/permiso.module";
import { UsuarioModule } from "./modules/usuario/usuario.module";
import { DireccionModule } from "./modules/direccion/direccion.module";
import { ProductoModule } from "./modules/producto/producto.module";

@Module({
  imports: [
      ConfigModule.forRoot({
          load: [envConfiguration],
          validationSchema: JoiValidationSchema
      }),

      MySQLDatabaseModule,
      ParametroModule,
      ValorParametroModule,
      PermisoModuloModule,
      PermisoParametroModule,
      PermisoRutaModule,
      PermisoRolModule,
      PermisoModule,
      UsuarioModule,
      DireccionModule,
      ProductoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
