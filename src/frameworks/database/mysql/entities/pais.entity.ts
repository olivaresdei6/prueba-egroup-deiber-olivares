import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { DepartamentoEntity } from "./index";

@Entity({name: 'pais'})
export class PaisEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada país',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('increment', {
        type: 'smallint',
        comment: 'Identificador único de cada país'
    })
    id?: number;

    @ApiProperty({
        description: 'UUID del registro',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        uniqueItems: true,
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        name: "uuid",
        comment: "UUID del pais. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        example: "Colombia",
        description: "Nombre del país",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 200,
        comment: "Nombre del país. Ejemplo: Colombia"
    })
    nombre!: string;

    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Descripción del país',
    })
    @Column({
        type: "varchar",
        nullable: true,
        comment: "Descripción del país"
    })
    descripcion?: string;

    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'observacion del país',
    })
    @Column({
        type: "varchar",
        nullable: true,
        comment: "observacion del país"
    })
    observacion?: string;

    @ApiProperty({
        description: "Fecha de creación del registro",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: "fecha_creacion",
        comment: "Fecha de creación del registro. Se genera automáticamente al momento de crear el registro"
    })
    fechaCreacion?: Date;

    @ApiProperty({
        description: "Fecha de actualización del registro",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: true,
        name: "fecha_actualizacion",
        comment: "Fecha de actualización del registro. Se genera automáticamente al momento de actualizar el registro",
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    fechaActualizacion?: Date;

    @ApiProperty({
        description: 'Estado del registro. 0: Inactivo, 1: Activo',
        example: 1,
        nullable: false
    })
    @Column({
        type: 'int',
        nullable: false,
        comment: 'Estado del registro. 0: Inactivo, 1: Activo',
        default: 1
    })
    estado?: number;

    @OneToMany(() => DepartamentoEntity, departamento => departamento.pais)
    departamentos?: DepartamentoEntity[];
}
