import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { DepartamentoEntity, DireccionEntity, ImagenEntity } from "./index";

@Entity({name: 'ciudad'})
@Index('unq_name_departamento', ['nombre', 'departamento'], {unique: true })
export class CiudadEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada ciudad.abstract.ts',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('increment', {
        type: 'smallint',
        comment: 'Identificador único de cada ciudad.abstract.ts'
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
        comment: "UUID de la ciudad.abstract.ts. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        example: "Bogotá",
        description: "Nombre de la ciudad.abstract.ts",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 200,
        comment: "Nombre de la ciudad.abstract.ts. Ejemplo: Bogotá"
    })
    nombre!: string;

    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Observaciones de la ciudad.abstract.ts',
        nullable: true
    })
    @Column('text', {
        nullable: true,
        comment: 'Observaciones de la ciudad.abstract.ts',
    })
    observacion?: string;

    @ApiProperty({
        example: 1,
        description: 'Estado de la ciudad.abstract.ts (1: Activo, 0: Inactivo)',
    })
    @Column('int', {
        default: 1,
        nullable: false,
        comment: 'Estado de la ciudad.abstract.ts (1: Activo, 0: Inactivo)'
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
        example: 'bogota.jpg',
        description: 'Logo del departamento',
    })
    @ManyToOne(() => ImagenEntity, imagen => imagen.id, {nullable: true, eager: true})
    logo?: number | ImagenEntity;
    
    @ApiProperty({
        example: 1,
        description: 'Identificador único del departamento al que pertenece la ciudad.abstract.ts',
    })
    @ManyToOne(() => DepartamentoEntity, departamento => departamento.id, {nullable: false, eager: true})
    @JoinColumn({name: 'id_departamento'})
    departamento!: number | DepartamentoEntity;
    
    @OneToMany(() => DireccionEntity, direccion => direccion.ciudad)
    direcciones?: DireccionEntity[];
}
