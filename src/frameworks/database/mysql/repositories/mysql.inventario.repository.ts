import { IInventarioRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLInventarioRepository<T> extends MysqlGenericRepository<T> implements IInventarioRepository <T> {

}
