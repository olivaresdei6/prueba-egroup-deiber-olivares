import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ProductoEntity } from "./";

@Entity({name: 'detalle_compra'})
export class DetalleCompraEntity {

    @ApiProperty({
        description: 'Identificador único de cada compra de un producto',
        example: 1,
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('increment', {
        type: 'bigint',
        comment: 'Identificador único de cada compra de un producto',
        unsigned: true,
    })
    id?: number;

    @Column({
        type: "varchar",
        length: 36,
        nullable: false,
        unique: true,
        comment: "UUID de la compra de un producto. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: 'Identificador único de cada compra',
        example: 1,
        uniqueItems: true,
    })
    @Column({
        type: 'bigint',
        nullable: false,
        name: 'id_compra',
        comment: 'Identificador único de cada compra',
        unsigned: true,
    })
    idCompra?: number;

    @ApiProperty({
        description: 'Cantidad de productos comprados',
        example: 1,
    })
    @Column({
        type: 'int',
        nullable: false,
        name: 'cantidad',
        comment: 'Cantidad de productos comprados'
    })
    cantidad!: number;

    @ApiProperty({
        description: 'Costo del producto',
        example: 1899876,
        required: true,
    })
    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        comment: 'Costo del producto',
    })
    costo!: number;

    @ApiProperty({
        description: 'Costo del producto sin iva',
        example: 1899876,
        required: true,
    })
    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        name: 'costo_sin_iva',
        comment: 'Costo del producto sin iva',
    })
    costo_sin_iva!: number;

    @ApiProperty({
        description: 'Costo del producto con iva',
        example: 1899876,
        required: true,
    })
    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        name: 'costo_iva',
        comment: 'Costo del producto con iva',
    })
    costo_con_iva!: number;

    @ApiProperty({
        description: 'Identificador único del producto comprado',
        example: 1,
    })
    @ManyToOne(() => ProductoEntity, producto => producto.id, {eager: true, nullable: false})
    @JoinColumn({name: 'id_producto'})
    producto!: number | ProductoEntity;

    @ApiProperty({
        description: "Fecha de creación del registro",
        example: "2023y-01-01 00:00:00"
    })
    @Column({
        type: "varchar",
        length: 100,
        nullable: true,
        comment: "Descripción del registro."
    })
    descripcion?: string;

    @ApiProperty({
        description: "Fecha de creación del registro",
        example: "2023y-01-01 00:00:00"
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
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Observaciones del registro',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        comment: 'Observaciones del registro'
    })
    observacion?: string;

    @Column({
        type: "int",
        nullable: false,
        default: 1,
        comment: "Estado del registro (1: activo, 0: inactivo)"
    })
    estado?: number;


}
