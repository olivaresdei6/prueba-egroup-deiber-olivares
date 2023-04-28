import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLDatabaseModule } from "./frameworks/database/mysql/mysql.module";

@Module({
  imports: [
      MySQLDatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
