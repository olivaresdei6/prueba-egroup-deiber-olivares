import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { InventarioEntity } from "./inventario.entity";
import { InventarioProductoEntity } from "./inventario_producto.entity";

@Entity({name: 'precio'})
export class PrecioEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada precio',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'smallint',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada precio ',
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
        description: 'Precio del producto',
        example: 1899876,
        required: true,
    })
    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        comment: 'Precio del producto',
    })
    precio!: number;

    @ApiProperty({
        description: 'Precio del producto sin iva',
        example: 1899876,
        required: true,
    })
    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        name: 'precio_sin_iva',
        comment: 'Precio del producto sin iva',
    })
    precio_sin_iva!: number;

    @ApiProperty({
        description: 'Precio del producto con iva',
        example: 1899876,
        required: true,
    })
    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        name: 'precio_iva',
        comment: 'Precio del producto con iva',
    })
    precio_con_iva!: number;

    @ApiProperty({
        description: 'Ganancia del producto',
        example: 1899876,
        required: true,
    })
    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        comment: 'Ganancia del producto',
    })
    ganancia!: number;

    @ApiProperty({
        description: 'Precio del producto sin iva',
        example: 1899876,
        required: true,
    })
    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        name: 'ganancia_sin_iva',
        comment: 'Ganancia del producto sin iva',
    })
    ganancia_sin_iva!: number;

    @ApiProperty({
        description: 'Ganancia del producto con iva',
        example: 1899876,
        required: true,
    })
    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        name: 'ganancia_iva',
        comment: 'Ganancia con iva',
    })
    ganancia_con_iva!: number;

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
        type: "tinyint",
        nullable: false,
        default: 1,
        comment: "Estado del precio (1: activo, 0: inactivo)"
    })
    estado?: number;

    @OneToMany(() => InventarioProductoEntity, preciosInventario => preciosInventario.precio)
    preciosInventario?: InventarioProductoEntity[];

    @OneToMany(() => InventarioEntity, inventario => inventario.precio)
    inventario?: InventarioEntity[];

}
