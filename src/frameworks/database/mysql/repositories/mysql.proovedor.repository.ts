import { IProovedorRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLProovedorRepository<T> extends MysqlGenericRepository<T> implements IProovedorRepository <T> {

}
