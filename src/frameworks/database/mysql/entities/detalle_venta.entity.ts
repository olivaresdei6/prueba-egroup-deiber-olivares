import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { InventarioEntity, CuponDeDescuentoEntity, VentaEntity } from "./";

@Entity({name: 'detalle_venta'})
export class DetalleVentaEntity {
    @ApiProperty({
        description: 'Identificador único de cada venta de un producto',
        example: 1,
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('increment', {
        type: 'bigint',
        comment: 'Identificador único de cada venta de un producto',
        unsigned: true,
    })
    id?: number;

    @Column({
        type: "varchar",
        length: 36,
        nullable: false,
        unique: true,
        comment: "UUID de la venta de un producto. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: 'Identificador único de cada venta',
        example: 1,
        uniqueItems: true,
    })
    @Column({
        type: 'bigint',
        nullable: false,
        name: 'id_venta',
        comment: 'Identificador único de cada venta',
        unsigned: true,
    })
    idVenta?: number;

    @ApiProperty({
        description: 'Cantidad de productos vendidos',
        example: 1,
    })
    @Column({
        type: 'int',
        nullable: false,
        name: 'cantidad',
        comment: 'Cantidad de productos vendidos'
    })
    cantidad!: number;

    @ApiProperty({
        description: 'Costo del precio de venta',
        example: 1,
        required: true,
    })
    @ManyToOne(() => InventarioEntity, inventario => inventario.id, {eager: true, nullable: false})
    @JoinColumn({name: 'id_inventario'})
    inventario!: number | InventarioEntity;

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

    @ManyToOne(() => CuponDeDescuentoEntity, cupon => cupon.id, {eager: true, nullable: true})
    @JoinColumn({name: 'id_cupon'})
    cupon?: number | CuponDeDescuentoEntity;

    @Column({
        type: "int",
        nullable: false,
        default: 1,
        comment: "Estado del registro (1: activo, 0: inactivo)"
    })
    estado?: number;

    @OneToMany(() => VentaEntity, venta => venta.detalleVenta)
    venta?: VentaEntity[];

}
