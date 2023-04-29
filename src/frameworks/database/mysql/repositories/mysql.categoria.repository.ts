import {ICategoriaRepository} from '../core/abstract';
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLCategoriaRepository<T> extends MysqlGenericRepository<T> implements ICategoriaRepository <T> {

}
