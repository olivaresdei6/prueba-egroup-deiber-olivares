import {ICategoriaTipoProductoRepository} from '../core/abstract';
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLCategoriaTipoProductoRepository<T> extends MysqlGenericRepository<T> implements ICategoriaTipoProductoRepository <T> {

}
