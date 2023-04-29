import { IVentaRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLVentaRepository<T> extends MysqlGenericRepository<T> implements IVentaRepository <T> {

}
