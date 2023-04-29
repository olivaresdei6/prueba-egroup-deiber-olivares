import { IImagenProductoRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLImagenProductoRepository<T> extends MysqlGenericRepository<T> implements IImagenProductoRepository <T> {

}
