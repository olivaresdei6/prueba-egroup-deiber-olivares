import { IPaisRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLPaisRepository<T> extends MysqlGenericRepository<T> implements IPaisRepository <T> {

}
