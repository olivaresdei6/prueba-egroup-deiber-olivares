import {ICompraRepository} from '../core/abstract';
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLCompraRepository<T> extends MysqlGenericRepository<T> implements ICompraRepository <T> {

}
