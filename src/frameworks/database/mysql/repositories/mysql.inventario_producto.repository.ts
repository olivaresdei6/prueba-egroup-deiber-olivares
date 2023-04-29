import { IInventarioProductoRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLInventarioProductoRepository<T> extends MysqlGenericRepository<T> implements IInventarioProductoRepository <T> {

}
