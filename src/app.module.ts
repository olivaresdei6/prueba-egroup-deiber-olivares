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
import { CuponModule } from "./modules/cupon/cupon.module";
import { PrecioModule } from "./modules/precio/precio.module";
import { InventarioModule } from "./modules/inventario/inventario.module";
import { VentaModule } from "./modules/venta/venta.module";
import { FileModule } from "./frameworks/external_file_storage/file/file.module";

@Module({
    imports: [
        ConfigModule.forRoot({
          load: [envConfiguration],
          validationSchema: JoiValidationSchema
        }),

        MySQLDatabaseModule,
        FileModule,
        ParametroModule,
        ValorParametroModule,
        PermisoModuloModule,
        PermisoParametroModule,
        PermisoRutaModule,
        PermisoRolModule,
        PermisoModule,
        UsuarioModule,
        DireccionModule,
        ProductoModule,
        CuponModule,
        PrecioModule,
        InventarioModule,
        VentaModule,
        ConfigModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
