import { IDetalleCompraRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLDetalleCompraRepository<T> extends MysqlGenericRepository<T> implements IDetalleCompraRepository <T> {

}
