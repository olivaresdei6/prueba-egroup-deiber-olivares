import { Injectable, BadRequestException } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { CuponDeDescuentoEntity, } from "../../frameworks/database/mysql/entities";
import { CrearCuponDto } from "./dto/crear-cupon.dto";
import { ActualizarCuponDto } from "./dto/actualizar-cupon.dto";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";
import { generarCuponDeDescuento } from "../../helpers/generarCuponDeDescuento";
import { parametrosRegistrados } from "../parametro/objects/parametros-registrados";
@Injectable()
export class CuponService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async crearRegistro(crearCuponDto: CrearCuponDto)  {
        const codigoCupon = generarCuponDeDescuento(10);
        const idTipoDeCupon = (await this.obtenerIdDelTipoDeCupon(crearCuponDto.uuidTipoCupon)) as number;
        if (idTipoDeCupon) {
            const cupon = await this.servicioDeBaseDeDatos.cupon.crearRegistro({ ...crearCuponDto, codigoCupon, tipoCupon: idTipoDeCupon });
            return {
                status: 201,
                message: 'Cupón creado correctamente',
                data: cupon,
            }
        }

    }

    async obtenerTodosLosRegistros(): Promise<CuponDeDescuentoEntity[]> {
        return await this.servicioDeBaseDeDatos.cupon.obtenerRegistros();
    }

    async obtenerUnRegistro(uuid: string): Promise<CuponDeDescuentoEntity> {
        return await this.servicioDeBaseDeDatos.cupon.obtenerUnRegistroPor({where: {uuid}}, 'Cupon');
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            if (campo === 'nombre') {
                return await this.servicioDeBaseDeDatos.cupon.obtenerRegistrosPaginados({limite, pagina, busqueda, campo: 'codigo_cupon'});
            }
            return await this.servicioDeBaseDeDatos.cupon.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.cupon.obtenerRegistrosPaginados({limite, pagina});
        }
    }

    async actualizarRegistro(uuid: string, actualizarCuponDto: ActualizarCuponDto)  {
        if (actualizarCuponDto.uuidTipoCupon) {
            const tipoDeCupon = await this.obtenerIdDelTipoDeCupon(actualizarCuponDto.uuidTipoCupon, true);
            //@ts-ignore
            if (tipoDeCupon.parametro.nombre === parametrosRegistrados.tiposDeCupon) {
                // @ts-ignore
                await this.servicioDeBaseDeDatos.cupon.actualizarRegistro(uuid, {...actualizarCuponDto, tipoCupon: tipoDeCupon.id});
                return {
                    status: 200,
                    message: 'Cupón actualizado correctamente',
                }
            }
            throw new BadRequestException('El tipo de cupón enviado no es válido');
        } else{
            await this.servicioDeBaseDeDatos.cupon.actualizarRegistro(uuid, actualizarCuponDto);
            return {
                status: 200,
                message: 'Cupón actualizado correctamente',
            }
        }
    }

    private async obtenerIdDelTipoDeCupon(uuidTipoCupon: string, isUpdate?: boolean) {
        const tipoDeCupon = await this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({where: {uuid: uuidTipoCupon}}, 'ValorParametro');
        // @ts-ignore
        if (tipoDeCupon.parametro.nombre === parametrosRegistrados.tiposDeCupon) {
            return isUpdate ? tipoDeCupon : tipoDeCupon.id;
        }
        throw new BadRequestException('El tipo de cupón enviado no es válido');
    }

}
