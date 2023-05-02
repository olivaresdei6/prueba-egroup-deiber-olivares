import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { ProductoService } from "./producto.service";
import { ProductoController } from "./producto.controller";

@Module({
    controllers: [ProductoController],
    providers: [ProductoService],
    exports: [ProductoService],
    imports: [MySQLDatabaseModule]
})
export class ProductoModule {}
