import { BadRequestException, Injectable } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import {
    CiudadEntity,
    DepartamentoEntity,
    DireccionEntity,
    PaisEntity,
    ParametroEntity
} from "../../frameworks/database/mysql/entities";
import { when } from "joi";
import {
    ActualizarCiudadDto,
    ActualizarDepartamentoDto, ActualizarDireccionDto,
    ActualizarPaisDto,
    CrearCiudadDto,
    CrearDepartamentoDto,
    CrearDireccionDto,
    CrearPaisDto
} from "./dto";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";
import { camposDeBusquedaParaDireccion } from "./object/campos-de-busqueda";

@Injectable()
export class DireccionService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}


    async crearRegistro(crearDto: any) {
        let entidad: any;
        if (crearDto instanceof CrearPaisDto) {
            entidad = await this.servicioDeBaseDeDatos.pais.crearRegistro(crearDto);
        } else if (crearDto instanceof CrearDepartamentoDto) {
            const pais = await this.obtenerPaisPorUUID(crearDto.uuidPais);
            console.log(pais);
            console.log(crearDto);
            entidad = await this.servicioDeBaseDeDatos.departamento.crearRegistro({...crearDto, pais: pais.id});
        } else if (crearDto instanceof CrearCiudadDto) {
            const departamento = await this.obtenerDepartamentoPorUUID(crearDto.uuidDepartamento);
            entidad = await this.servicioDeBaseDeDatos.ciudad.crearRegistro({...crearDto, departamento: departamento.id});
        } else if (crearDto instanceof CrearDireccionDto) {
            const ciudad = await this.obtenerCiudadPorUUID(crearDto.uuidCiudad);
            entidad = await this.servicioDeBaseDeDatos.direccion.crearRegistro({...crearDto, ciudad: ciudad.id});
        } else {
            throw new BadRequestException('No se puede crear el registro');
        }

        if (entidad) {
            return {
                status: 201,
                message: 'Registro creado correctamente',
            };
        }
    }

    async obtenerTodosLosRegistros(entidad: string): Promise<PaisEntity[] | DepartamentoEntity[] | CiudadEntity[] | DireccionEntity[]> {
        switch (entidad) {
            case 'pais':
                return await this.servicioDeBaseDeDatos.pais.obtenerRegistros();
            case 'departamento':
                return await this.servicioDeBaseDeDatos.departamento.obtenerRegistros();
            case 'ciudad':
                return await this.servicioDeBaseDeDatos.ciudad.obtenerRegistros();
            case 'direccion':
                return await this.servicioDeBaseDeDatos.direccion.obtenerRegistros();
            default:
                throw new BadRequestException('No se puede obtener los registros. Entidad no encontrada. Se esperaba pais, departamento, ciudad o direccion');
        }
    }

    async obtenerRegistros(entidad: string) {
        entidad = entidad ? entidad.toLowerCase() : 'direccion';
        switch (entidad.toLowerCase()) {
            case 'direccion':
                return await this.servicioDeBaseDeDatos.direccion.obtenerRegistros();
            case 'departamento':
                return await this.servicioDeBaseDeDatos.departamento.obtenerRegistros();
            case 'ciudad':
                return await this.servicioDeBaseDeDatos.ciudad.obtenerRegistros();
            case 'pais':
                return await this.servicioDeBaseDeDatos.pais.obtenerRegistros();
            default:
                throw new BadRequestException('No se puede obtener los registros. Entidad no encontrada. Se esperaba en el nombre del campo: pais, departamento, ciudad o direccion');
        }
    }

    async actualizarRegistro(uuid: string, actualizarDto: ActualizarCiudadDto | ActualizarDepartamentoDto | ActualizarPaisDto | ActualizarDireccionDto) {
        let entidad: PaisEntity | DepartamentoEntity | CiudadEntity | DireccionEntity;
        switch (actualizarDto.constructor) {
            case ActualizarPaisDto:
                entidad = await this.actualizarPais(uuid, actualizarDto) as PaisEntity;
                break;
            case ActualizarDepartamentoDto:
                   entidad = await this.actualizarDepartamento(uuid, actualizarDto) as DepartamentoEntity;
                break;
            case ActualizarCiudadDto:
                entidad = await this.actualizarCiudad(uuid, actualizarDto) as CiudadEntity;
                break;
            case ActualizarDireccionDto:
                entidad = await this.actualizarDireccion(uuid, actualizarDto) as DireccionEntity;
                break;
            default:
                throw new BadRequestException('No se puede actualizar el registro. Entidad no encontrada. Se esperaba pais, departamento, ciudad o direccion');
        }

        if (entidad) {
            return {
                status: 200,
                message: 'Registro actualizado correctamente',
            }
        }
    }

    private async obtenerDepartamentoPorUUID(uuid: string): Promise<DepartamentoEntity> {
        console.log(uuid);
        return await this.servicioDeBaseDeDatos.departamento.obtenerUnRegistroPor({where: {uuid}}, 'Departamento');
    }

    private async obtenerCiudadPorUUID(uuid: string): Promise<CiudadEntity> {
        return await this.servicioDeBaseDeDatos.ciudad.obtenerUnRegistroPor({where: {uuid}}, 'Ciudad');
    }

    private async obtenerDireccionPorUUID(uuid: string): Promise<DireccionEntity> {
        return await this.servicioDeBaseDeDatos.direccion.obtenerUnRegistroPor({where: {uuid}}, 'Direccion');
    }

    private async obtenerPaisPorUUID(uuid: string): Promise<PaisEntity> {
        return await this.servicioDeBaseDeDatos.pais.obtenerUnRegistroPor({where: {uuid}}, 'Pais');
    }

    async actualizarPais(uuid: string, actualizarDto: ActualizarPaisDto) {
        return await this.servicioDeBaseDeDatos.pais.actualizarRegistro(uuid, actualizarDto);
    }

    async actualizarDepartamento(uuid: string, actualizarDto: ActualizarDepartamentoDto) {
        const {uuidPais} = actualizarDto;
        if (uuidPais) {
            const pais = await this.obtenerPaisPorUUID(uuidPais);
            if (pais) {
                return await this.servicioDeBaseDeDatos.departamento.actualizarRegistro(uuid, {...actualizarDto, pais: pais.id});
            }
        }else {
            return await this.servicioDeBaseDeDatos.departamento.actualizarRegistro(uuid, actualizarDto);
        }
    }

    async actualizarCiudad(uuid: string, actualizarDto: ActualizarCiudadDto) {
        const {uuidDepartamento} = actualizarDto;
        if (uuidDepartamento) {
            const departamento = await this.obtenerDepartamentoPorUUID(uuidDepartamento);
            if (departamento) {
                return await this.servicioDeBaseDeDatos.ciudad.actualizarRegistro(uuid, {...actualizarDto, departamento: departamento.id});
            }
        }else {
            return await this.servicioDeBaseDeDatos.ciudad.actualizarRegistro(uuid, actualizarDto);
        }
    }

    async actualizarDireccion(uuid: string, actualizarDto: ActualizarDireccionDto) {
        const {uuidCiudad} = actualizarDto;
        if (uuidCiudad) {
            const ciudad = await this.obtenerCiudadPorUUID(uuidCiudad);
            if (ciudad) {
                return await this.servicioDeBaseDeDatos.direccion.actualizarRegistro(uuid, {...actualizarDto, ciudad: ciudad.id});
            }
        }else {
            return await this.servicioDeBaseDeDatos.direccion.actualizarRegistro(uuid, actualizarDto);
        }
    }
}
