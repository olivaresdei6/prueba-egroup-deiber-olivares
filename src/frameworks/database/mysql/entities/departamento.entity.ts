import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {ImagenEntity, PaisEntity, CiudadEntity } from "./index";

@Entity({name: 'departamento'})
@Index('unq_departamento_pais', ['nombre', 'pais'], {unique: true })
export class DepartamentoEntity {
   
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada departamento',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('increment',{
        type: 'smallint',
        comment: 'Identificador único de cada departamento'
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
        comment: "UUID del departamento. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        example: "Cundinamarca",
        description: "Nombre del departamento",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 200,
        comment: "Nombre del departamento. Ejemplo: Cundinamarca"
    })
    nombre!: string;
    
    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Observaciones del departamento',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        comment: 'Observaciones del departamento',
        length: 500
    })
    observacion?: string;
    
    @ApiProperty({
        example: 1,
        description: 'Estado del departamento (1: Activo, 0: Inactivo)',
    })
    @Column('int', {
        default: 1,
        nullable: false,
        comment: 'Estado del departamento (1: Activo, 0: Inactivo)'
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
        example: 'cundinamarca.jpg',
        description: 'Logo del departamento',
    })
    @ManyToOne(() => ImagenEntity, imagen => imagen.id, {nullable: true, eager: true})
    logo?: number | ImagenEntity;
    
    @ManyToOne(() => PaisEntity, pais => pais.id, {nullable: false, eager: true})
    @JoinColumn({name: 'id_pais'})
    pais?: number | PaisEntity;

    @OneToMany(() => CiudadEntity, ciudad => ciudad.departamento)
    ciudades?: CiudadEntity[];
}
