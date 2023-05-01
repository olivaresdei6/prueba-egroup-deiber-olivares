import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CrearPermisoParametroDto } from "./dto/crear-permiso-parametro.dto";
import { ActualizarPermisoParametroDto } from "./dto/actualizar-permiso-parametro.dto";
import { parametrosRegistrados } from "../parametro/objects/parametros-registrados";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class PermisoParametroService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async crearRegistro(crearPermisoParametroDto: CrearPermisoParametroDto)  {
        const valorParametro = await this.obtenerValorParametroPorUuid(crearPermisoParametroDto.uuidTipoDeDato);
        //@ts-ignore
        if(valorParametro && valorParametro.parametro.nombre === parametrosRegistrados.tiposDeDatosParaParametrosDeRutas){
            const permisoParametro =  await this.servicioDeBaseDeDatos.permisoParametro.crearRegistro({...crearPermisoParametroDto, tipoDeDato: valorParametro.id});
            if (permisoParametro) {
                return {
                    status: 201,
                    message: 'Permiso Parametro creado correctamente',
                }
            }
        }
    }

    async obtenerTodosLosRegistros() {
       const parametrosDeRutas = await this.servicioDeBaseDeDatos.permisoParametro.obtenerRegistros();
        return await Promise.all(parametrosDeRutas.map(async (parametroDeRuta) => {
           const tipoDeDato = await this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({
               where: { id: parametroDeRuta.tipoDeDato } }, 'Tipo De Dato', false
           );
            console.log(tipoDeDato);
           return {
               ...parametroDeRuta,
               tipoDeDato
           }
       }));
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.permisoParametro.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.permisoParametro.obtenerRegistrosPaginados({limite, pagina});
        }
    }

    async obtenerUnRegistro(uuid: string) {
        let permisoParametroRuta =  await this.servicioDeBaseDeDatos.permisoParametro.obtenerUnRegistroPor({where: {uuid}}, 'Permiso De Ruta');
        if (permisoParametroRuta) {
            //@ts-ignore
            permisoParametroRuta.tipoDeDato = await this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({
                    where: { id: permisoParametroRuta.tipoDeDato }
                }, 'Tipo De Dato', false
            );
            return {
                permisoParametroRuta,
            }
        }
    }

    async actualizarRegistro(uuid: string, actualizarPermisoParametroDto: ActualizarPermisoParametroDto)  {
        let  permisoDeRuta;
        if (actualizarPermisoParametroDto.uuidTipoDeDato) {
            const valorParametro = await this.obtenerValorParametroPorUuid(actualizarPermisoParametroDto.uuidTipoDeDato);
            //@ts-ignore
            if(valorParametro && valorParametro.parametro.nombre === parametrosRegistrados.tiposDeDatosParaParametrosDeRutas){
                permisoDeRuta = await this.servicioDeBaseDeDatos.permisoParametro.actualizarRegistro(uuid, {...actualizarPermisoParametroDto, tipoDeDato: valorParametro.id});
            }
        }else{
            permisoDeRuta = await this.servicioDeBaseDeDatos.permisoParametro.actualizarRegistro(uuid, actualizarPermisoParametroDto);
        }
        if (permisoDeRuta) {
            return {
                status: 201,
                message: 'Permiso de ruta actualizado correctamente',
            }
        }
    }

    private obtenerValorParametroPorUuid(uuid: string) {
        return this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({ where: { uuid } }, 'Valor Parametro');
    }

}
