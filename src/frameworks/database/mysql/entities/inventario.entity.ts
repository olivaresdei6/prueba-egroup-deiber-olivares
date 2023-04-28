import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ProductoEntity, InventarioProductoEntity, PrecioEntity } from "./";


@Entity({name: 'inventario'})
export class InventarioEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador de cada inventario',
        type: 'number',
    })
    @PrimaryGeneratedColumn({
        type: "int",
        unsigned: true,
        comment: "Identificador de cada inventario"
    })
    id?: number;

    @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'Identificador único de cada inventario',
        type: 'string',
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        comment: "UUID de cada inventario. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        example: 10,
        description: "Cantidad de productos en el inventario",
    })
    @Column({
        type: "int",
        nullable: false,
        name: "cantidad",
        comment: "Cantidad de productos en el inventario. Este valor se modifica a través de las transacciones de compra y venta de productos",
    })
    cantidad!: number;

    @ApiProperty({
        example: 20,
        description: "Cantidad disponible de productos en el inventario",
    })
    @Column({
        type: "int",
        nullable: false,
        name: "cantidad_disponible",
        comment: "Cantidad disponible de productos en el inventario. Este valor se modifica a través de las transacciones de compra y venta de productos",
    })
    cantidadDisponible!: number;

    @ApiProperty({
        example: 10,
        description: "Cantidad reservada de productos en el inventario",
    })
    @Column({
        type: "int",
        nullable: false,
        name: "cantidad_reservada",
    })
    cantidadReservada!: number;

    @ApiProperty({
        example: 10,
        description: "Cantidad de productos vendidos",
    })
    @Column({
        type: "int",
        nullable: false,
        name: "cantidad_vendida",
    })
    cantidadVendida!: number;

    @ApiProperty({
        example: 10,
        description: "Cantidad de productos comprados",
    })
    @Column({
        type: "int",
        nullable: false,
        name: "cantidad_comprada",
    })
    cantidadComprada!: number;

    @ApiProperty({
        example: 10,
        description: "Cantidad de productos devueltos",
    })
    @Column({
        type: "int",
        nullable: false,
        name: "cantidad_devuelta",
    })
    cantidadDevuelta!: number;

    @ApiProperty({
        example: 1,
        description: "Identificador único de cada producto",
    })
    @ManyToOne(() => ProductoEntity, producto => producto.id, { nullable: false })
    @JoinColumn({ name: 'id_producto' })
    producto!: ProductoEntity;

    @OneToMany(() => InventarioProductoEntity, precioInventario => precioInventario.precio)
    precioInventarios?: InventarioProductoEntity[];

    @ApiProperty({
        example: 1,
        description: "Identificador único de cada precio",
    })
    @ManyToOne(() => PrecioEntity, precio => precio.id, { nullable: false })
    @JoinColumn({ name: 'id_precio' })
    precio!: number | PrecioEntity;

    @ApiProperty({
        example: 'Este inentario es para el termo Bonafont de 1 litro',
        description: 'Descripción del inventario',
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        comment: 'Descripción del inventario'
    })
    descripcion?: string;

    @ApiProperty({
        example: 'Este inentario es para el termo Bonafont de 1 litro',
        description: 'Observación del inventario',
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        comment: 'Observación del inventario'
    })
    observacion?: string;

    @ApiProperty({
        description: "Estado del inventario. 1: Activo, 2: Inactivo",
        example: 1,
        nullable: false,
        default: 1,
    })
    @Column({
        type: "int",
        nullable: false,
        default: 1,
        name: "estado",
        comment: "Estado del inventario. 1: Activo, 2: Inactivo"
    })
    estado?: number;

}
