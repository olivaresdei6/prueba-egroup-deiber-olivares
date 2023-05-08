import { Module } from "@nestjs/common";
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { VentaController } from "./venta.controller";
import { VentaService } from "./venta.service";


@Module({
    imports: [MySQLDatabaseModule],
    controllers: [VentaController],
    providers: [VentaService],
    exports: [VentaService]
})

export class VentaModule {}
