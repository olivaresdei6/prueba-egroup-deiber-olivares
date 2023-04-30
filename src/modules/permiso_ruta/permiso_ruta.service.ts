import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CrearPermisoRutaDto } from "./dto/crear-permiso-ruta.dto";
import { ActualizarPermisoRutaDto } from "./dto/actualizar-permiso-ruta.dto";
import { parametrosRegistrados } from "../parametro/objects/parametros-registrados";

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

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        const camposPermitidos = [ 'nombre', 'descripcion', 'observacion'];
        if (campo && !camposPermitidos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido');
        }
        if (busqueda && campo) {
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

    private obtenerValorParametroPorUuid(uuid: string) {
        return this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({ where: { uuid } }, 'Valor Parametro');
    }

}
