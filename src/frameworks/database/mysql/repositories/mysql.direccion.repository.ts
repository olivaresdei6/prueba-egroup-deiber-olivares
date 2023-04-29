import { IDireccionRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLDireccionRepository<T> extends MysqlGenericRepository<T> implements IDireccionRepository <T> {

}
