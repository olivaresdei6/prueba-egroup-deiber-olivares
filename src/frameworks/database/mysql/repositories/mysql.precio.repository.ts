import { IPrecioRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLPrecioRepository<T> extends MysqlGenericRepository<T> implements IPrecioRepository <T> {

}
