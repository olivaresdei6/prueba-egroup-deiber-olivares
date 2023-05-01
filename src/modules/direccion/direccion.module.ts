import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { DireccionService } from "./direccion.service";
import { DireccionController } from "./direccion.controller";

@Module({
    controllers: [DireccionController],
    providers: [DireccionService],
    exports: [DireccionService],
    imports: [MySQLDatabaseModule]
})
export class DireccionModule {}
