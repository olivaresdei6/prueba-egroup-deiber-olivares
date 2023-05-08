import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { ProductoService } from "./producto.service";
import { ProductoController } from "./producto.controller";
import { FileModule } from "../../frameworks/external_file_storage/file/file.module";

@Module({
    controllers: [ProductoController],
    providers: [ProductoService],
    exports: [ProductoService],
    imports: [MySQLDatabaseModule, FileModule]
})
export class ProductoModule {}
