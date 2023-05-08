import { Module } from "@nestjs/common";
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { InventarioService } from "./inventario.service";
import { InventarioController } from "./inventario.controller";

@Module({
    imports: [MySQLDatabaseModule],
    controllers: [InventarioController],
    exports: [InventarioService],
    providers: [InventarioService],
})
export class InventarioModule {}
