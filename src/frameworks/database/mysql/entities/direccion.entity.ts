import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { CiudadEntity, ProovedorEntity, VentaEntity } from "./";

@Entity({name: 'direccion'})
export class DireccionEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada direccion',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('increment', {
        type: 'bigint',
        comment: 'Identificador único de cada direccion'
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
        comment: "UUID de la direccion. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;


    @ApiProperty({
        example: "Calle 123",
        description: "Nombre de la dirección",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 200,
        comment: "Nombre de la direccion. Ejemplo: Calle 123"
    })
    nombre!: string;
    
    
    @ApiProperty({
        example: 0o1233432,
        description: 'Coordenada 1 de la dirección',
        uniqueItems: true,
    })
    @Column({
        type: 'decimal',
        unique: true,
        nullable: false,
        comment: 'Coordenada 1 de la dirección para sistemas de geolocalización'
    })
    coordenada1?: number;

    @ApiProperty({
        example: 0o1233432,
        description: 'Coordenada 2 de la dirección',
        uniqueItems: true,
    })
    @Column({
        type: 'decimal',
        unique: true,
        nullable: false,
        comment: 'Coordenada 2 de la dirección para sistemas de geolocalización'
    })
    coordenada2?: number;

    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Observaciones de la dirección',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        comment: 'Observaciones de la dirección',
        length: 500
    })
    observacion?: string;

    @ApiProperty({
        example: 1,
        description: 'Estado de la dirección (1: Activo, 0: Inactivo)',
    })
    @Column('int', {
        default: 1,
        nullable: false,
        comment: 'Estado de la dirección (1: Activo, 0: Inactivo)'
    })
    estado?: number;

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
        nullable: false,
        name: "fecha_actualizacion",
        comment: "Fecha de actualización del registro. Se genera automáticamente al momento de actualizar el registro",
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    fechaActualizacion?: Date;

    @ApiProperty({
        example: 1,
        description: 'Identificador único de la ciudad.abstract.ts',
    })
    @ManyToOne(() => CiudadEntity, ciudad => ciudad.id)
    @JoinColumn({name: "id_ciudad"})
    ciudad: number | CiudadEntity;

    @OneToMany(() => ProovedorEntity, proovedor => proovedor.direccion)
    proovedores: ProovedorEntity[];

    @OneToMany(() => VentaEntity, venta => venta.direccion)
    ventas: VentaEntity[];
}
