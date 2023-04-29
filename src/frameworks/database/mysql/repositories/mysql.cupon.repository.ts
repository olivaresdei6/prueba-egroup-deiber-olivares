import { ICuponRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLCuponRepository<T> extends MysqlGenericRepository<T> implements ICuponRepository <T> {

}
