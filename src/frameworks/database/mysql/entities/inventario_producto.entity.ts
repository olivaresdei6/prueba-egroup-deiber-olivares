import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ProductoEntity, InventarioEntity, PrecioEntity } from "./";

@Entity({name: 'precio_producto'})
export class InventarioProductoEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada registro',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'bigint',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada registro ',
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
        comment: "UUID de cada precio. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

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
        comment: 'Observaciones del registro',
        length: 500,
    })
    observacion?: string;

    @Column({
        type: "int",
        nullable: false,
        default: 1,
        comment: "Estado del registro (1: activo, 0: inactivo)"
    })
    estado?: number;

    @ApiProperty({
        example: 1,
        description: 'Identificador único del producto',
    })
    @ManyToOne(() => InventarioEntity, inventario => inventario.id, { nullable: false })
    inventario!: number | ProductoEntity;

    @ApiProperty({
        example: 1,
        description: 'Precio del producto',
    })
    @ManyToOne(() => PrecioEntity, precio => precio.id, { nullable: false })
    precio!: number | PrecioEntity;

}
