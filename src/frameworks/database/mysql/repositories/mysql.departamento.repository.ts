import { IDepartamentoRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLDepartamentoRepository<T> extends MysqlGenericRepository<T> implements IDepartamentoRepository <T> {

}
