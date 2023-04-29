import {ICiudadRepository} from '../core/abstract';
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLCiudadRepository<T> extends MysqlGenericRepository<T> implements ICiudadRepository <T> {

}
