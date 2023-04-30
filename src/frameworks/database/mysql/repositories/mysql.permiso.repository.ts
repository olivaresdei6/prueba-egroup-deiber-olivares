import { IPermisoRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLPermisoRepository<T> extends MysqlGenericRepository<T> implements IPermisoRepository <T> {

}
