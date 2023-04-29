import { IProductoRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLProductoRepository<T> extends MysqlGenericRepository<T> implements IProductoRepository <T> {

}
