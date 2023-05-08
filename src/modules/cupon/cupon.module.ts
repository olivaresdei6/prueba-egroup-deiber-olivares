import { Module } from "@nestjs/common";
import { CuponController } from "./cupon.controller";
import { CuponService } from "./cupon.service";
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";

@Module({
    controllers: [CuponController],
    providers: [CuponService],
    exports: [CuponService],
    imports: [MySQLDatabaseModule]
})
export class CuponModule {}
