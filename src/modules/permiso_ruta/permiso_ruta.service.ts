import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CrearPermisoRutaDto } from "./dto/crear-permiso-ruta.dto";
import { ActualizarPermisoRutaDto } from "./dto/actualizar-permiso-ruta.dto";
import { parametrosRegistrados } from "../parametro/objects/parametros-registrados";
import { CrearRelacionRutaParametroDto } from "./dto/crear-relacion-ruta-parametro.dto";
import { ActualizarRelacionRutaParametroDto } from "./dto/actualizar-relacion-ruta-parametro.dto";
import { isValidUuid } from "../../helper/validateUUID";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class PermisoRutaService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async crearRegistro(crearPermisoRutaDto: CrearPermisoRutaDto)  {
        const valorParametro = await this.obtenerValorParametroPorUuid(crearPermisoRutaDto.uuidMetodoHttp);
        console.log(valorParametro.nombre);

        //@ts-ignore
        if(valorParametro && valorParametro.parametro.nombre === parametrosRegistrados.metodosHttp){
            const permisoRuta =  await this.servicioDeBaseDeDatos.permisoRuta.crearRegistro({...crearPermisoRutaDto, metodoHttp: valorParametro.id});
            if (permisoRuta) {
                return {
                    status: 201,
                    message: 'Permiso - Ruta creada correctamente',
                }
            }
        }
    }

    async crearRelacionRutaParametro( crearRelacionRutaParametroDto:CrearRelacionRutaParametroDto){
        const {permisoRuta} = await this.obtenerUnRegistro(crearRelacionRutaParametroDto.uuidRuta);
        const permisoParametro = await this.obtenerParametroPorUuid(crearRelacionRutaParametroDto.uuidParametro);
        if(permisoRuta && permisoParametro){
            const relacionRutaParametro = await this.servicioDeBaseDeDatos.permisoParametroRuta.crearRegistro({ruta: permisoRuta.id, parametro: permisoParametro.id});
            if(relacionRutaParametro){
                return {
                    status: 201,
                    message: 'Relacion Ruta - Parametro creada correctamente',
                }
            }
        }
    }

    async obtenerTodosLosRegistros() {
       const rutas = await this.servicioDeBaseDeDatos.permisoRuta.obtenerRegistros();
        return await Promise.all(rutas.map(async (parametroDeRuta) => {
           const metodoHttp = await this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({
               where: { id: parametroDeRuta.metodoHttp} }, 'Ruta', false
           );
           return {
               ...parametroDeRuta,
               metodoHttp
           }
       }));
    }

    async obtenerTodasLasRelacionesRutaParametro() {
        return await this.servicioDeBaseDeDatos.permisoParametroRuta.obtenerRegistros();
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.permisoRuta.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.permisoRuta.obtenerRegistrosPaginados({limite, pagina});
        }
    }

    async obtenerUnRegistro(uuid: string) {
        let permisoRuta =  await this.servicioDeBaseDeDatos.permisoRuta.obtenerUnRegistroPor({where: {uuid}}, 'Ruta');
        if (permisoRuta) {
            //@ts-ignore
            permisoRuta.metodoHttp = await this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({
                    where: { id: permisoRuta.metodoHttp }
                }, 'Método Http', false
            );
            return {
                permisoRuta,
            }
        }
    }

    async obtenerRelacionRutaParametro(uuid: string) {
        return await this.servicioDeBaseDeDatos.permisoParametroRuta.obtenerUnRegistroPor({where: {uuid}}, 'Relacion Ruta Parametro');
    }

    async actualizarRegistro(uuid: string, actualizarPermisoRutaDto: ActualizarPermisoRutaDto)  {
        let  permisoRuta;
        if (actualizarPermisoRutaDto.uuidMetodoHttp) {
            const valorParametro = await this.obtenerValorParametroPorUuid(actualizarPermisoRutaDto.uuidMetodoHttp);
            //@ts-ignore
            if(valorParametro && valorParametro.parametro.nombre === parametrosRegistrados.metodosHttp){
                permisoRuta = await this.servicioDeBaseDeDatos.permisoRuta.actualizarRegistro(uuid, {...actualizarPermisoRutaDto, metodoHttp: valorParametro.id});
            }
        }else{
            permisoRuta = await this.servicioDeBaseDeDatos.permisoRuta.actualizarRegistro(uuid, actualizarPermisoRutaDto);
        }
        if (permisoRuta) {
            return {
                status: 201,
                message: 'Ruta actualizada correctamente',
            }
        }
    }

    async actualizarRelacionRutaParametro(uuid: string, actualizarRelacionRutaParametroDto: ActualizarRelacionRutaParametroDto) {
        const {uuidRuta, uuidParametro, observacion, descripcion} = actualizarRelacionRutaParametroDto;
        if (uuidParametro) {
            const permisoParametro = await this.obtenerParametroPorUuid(uuidParametro);
            await this.servicioDeBaseDeDatos.permisoParametroRuta.actualizarRegistro(uuid, {
                parametro: permisoParametro.id, observacion, descripcion
            });
        }

        if (uuidRuta) {
            const permisoRuta = await this.obtenerUnRegistro(uuidRuta);
            await this.servicioDeBaseDeDatos.permisoParametroRuta.actualizarRegistro(uuid, {
                ruta: permisoRuta.permisoRuta.id, observacion, descripcion
            });
        }

        else if (uuidParametro && uuidRuta) {
            const permisoParametro = await this.obtenerParametroPorUuid(uuidParametro);
            const permisoRuta = await this.obtenerUnRegistro(uuidRuta);
            if(permisoParametro && permisoRuta){
                const relacionRutaParametro = await this.servicioDeBaseDeDatos.permisoParametroRuta.actualizarRegistro(uuid, {
                    ruta: permisoRuta.permisoRuta.id, parametro: permisoParametro.id, observacion, descripcion
                });
                if(relacionRutaParametro){
                    return {
                        status: 201,
                        message: 'Relacion Ruta - Parametro actualizada correctamente',
                    }
                }
            }
        }

        else {
            await this.servicioDeBaseDeDatos.permisoParametroRuta.actualizarRegistro(uuid, {observacion, descripcion});
        }

        return {
            status: 201,
            message: 'Relacion Ruta - Parametro actualizada correctamente',
        }
    }

    private obtenerValorParametroPorUuid(uuid: string) {
        return this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({ where: { uuid } }, 'Valor Parametro');
    }

    private obtenerParametroPorUuid(uuid: string) {
        return this.servicioDeBaseDeDatos.permisoParametro.obtenerUnRegistroPor({ where: { uuid } }, 'Ruta')
    }


}
