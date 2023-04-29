import { IPermisoRolModuloRutaRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLPermisoRolModuloRutaRepository<T> extends MysqlGenericRepository<T> implements IPermisoRolModuloRutaRepository <T> {

}
