import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { DireccionEntity } from "./direccion.entity";
import { CompraEntity } from "./compra.entity";


@Entity({name: 'proovedor'})
export class ProovedorEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada proovedor',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('increment', {
        type: 'smallint',
        comment: 'Identificador único de cada proovedor'
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
        comment: "UUID del proovedor. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        example: "Colombia",
        description: "Nombre del proovedor",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 200,
        comment: "Nombre del proovedor"
    })
    nombre!: string;

    @ApiProperty({
        example: 'correo@correo.com',
        description: 'Correo del proovedor',
        uniqueItems: true,
    })
    @Column('varchar', {
        unique: true,
        nullable: false,
        length : 200,
        comment: "Correo del proovedor"
    })
    correo!: string;

    @ApiProperty({
        example: '123456789',
        description: 'Telefono del proovedor',
        uniqueItems: true,
    })
    @Column('varchar', {
        unique: true,
        nullable: false,
        length : 200,
        comment: "Telefono del proovedor"
    })
    telefono!: string;

    @ApiProperty({
        example: 1,
        description: 'Identificador único de la dirección del proovedor',
        uniqueItems: true
    })
    @ManyToOne( () => DireccionEntity, direccion => direccion.id, { nullable: true, eager: true } )
    @JoinColumn({ name: 'id_direccion' })
    direccion?: number;

    @ApiProperty({
        example: '123456789',
        description: 'N° de documento del proovedor',
        uniqueItems: true,
    })
    @Column('varchar', {
        unique: true,
        nullable: false,
        length : 200,
        comment: "N° de documento del proovedor"
    })
    documento!: string;

    @ApiProperty({
        example: 1,
        description: 'Identificador único del tipo de documento del proovedor',
    })
    @Column('varchar', {
        unique: true,
        nullable: false,
        length : 200,
        comment: "N° de documento del proovedor"
    })
    id_tipo_documento!: number;

    @ApiProperty({
        example: '123456789',
        description: 'N° de cuenta del proovedor',
        uniqueItems: true,
    })
    @Column('varchar', {
        unique: true,
        nullable: false,
        length : 200,
        comment: "N° de cuenta del proovedor"
    })
    cuenta!: string;

    @ApiProperty({
        example: 'Banco de Bogotá',
        description: 'Banco del proovedor',
        uniqueItems: true,
    })
    @Column('varchar', {
        nullable: false,
        length : 200,
        comment: "Banco del proovedor"
    })
    banco!: string;

    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Observaciones del registro',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        comment: 'Observaciones del registro',
        length: 500
    })
    observacion?: string;

    @ApiProperty({
        description: "Fecha de creación del registro",
        example: "2023y-01-01 00:00:00"
    })
    @Column({
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "Descripción del registro."
    })
    descripcion?: string;

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

    @OneToMany(() => CompraEntity, compra => compra.proovedor)
    compras?: CompraEntity[];
}
