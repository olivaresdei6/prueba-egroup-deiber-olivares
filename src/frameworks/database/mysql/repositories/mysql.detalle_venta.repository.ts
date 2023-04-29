import { IDetalleVentaRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLDetalleVentaRepository<T> extends MysqlGenericRepository<T> implements IDetalleVentaRepository <T> {

}
