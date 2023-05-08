import { Module } from "@nestjs/common";
import { PrecioService } from "./precio.service";
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { PrecioController } from "./precio.controller";

@Module({
    exports: [PrecioService],
    providers: [PrecioService],
    imports: [MySQLDatabaseModule],
    controllers: [PrecioController]
})
export class PrecioModule {}
