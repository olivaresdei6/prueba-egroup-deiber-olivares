import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { DetalleVentaEntity } from "./detalle_venta.entity";


@Entity({name: 'cupon_de_descuento'})
export class CuponDeDescuentoEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador de cada cupon',
        type: 'number',
    })
    @PrimaryGeneratedColumn({
        name: "id",
        type: "int",
        unsigned: true,
        comment: "Identificador de cada cupon"
    })
    id?: number;

    @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'Identificador único de cada cupon',
        type: 'string',
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        comment: "UUID del cupon. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        example: "M7U8B9",
        description: "Codigo del cupon",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 50,
        name: "codigo_cupon",
        comment: "Código del cupon: M7U8B9, 8J9K0L, etc"
    })
    codigoCupon!: string;

    @ApiProperty({
        example: 10,
        description: "Porcentaje de descuento",
    })
    @Column({
        type: "decimal",
        precision: 5,
        nullable: false,
        name: "porcentaje_descuento",
        comment: "Porcentaje de descuento: 10, 20, 30, etc"
    })
    porcentajeDescuento!: number;

    @ApiProperty({
        example: 40,
        description: "Cantidad de veces que se puede usar el cupon",
    })
    @Column({
        type: "int",
        nullable: false,
        name: "cantidad_usos",
        comment: "Cantidad de veces que se puede usar el cupon"
    })
    cantidadUsos!: number;

    @ApiProperty({
        example: 3,
        description: "Cantidad de veces que se ha usado el cupon",
    })
    @Column({
        type: "int",
        nullable: false,
        name: "cantidad_usos_realizados",
        comment: "Cantidad de veces que se ha usado el cupon"
    })
    cantidadUsosRealizados!: number;

    @ApiProperty({
        example: 2,
        description: "Tipo de cupon",
    })
    @Column({
        type: "int",
        nullable: false,
        name: "tipo_cupon",
        comment: "Tipo de cupon: 1: Para todos los productos, 2: Para un producto en específico, 3: Para una categoría de productos, 4: Para una marca de productos, etc"
    })
    tipoCupon!: number;

    @ApiProperty({
        example: 'Cupon de deescuento del 16%',
        description: 'Descripción del cupon'
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        comment: 'Descripción del cupon'
    })
    descripcion?: string;

    @ApiProperty({
        example: 'Cupón de descuento valido solo para compras mayores a $100.000',
        description: 'Observación del cupon',
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        comment: 'Observación del cupon'
    })
    observacion?: string;

    @ApiProperty({
        description: "Fecha de creación del cupon",
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
        nullable: true,
        name: "fecha_actualizacion",
        comment: "Fecha de actualización del registro. Se genera automáticamente al momento de actualizar el registro",
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    fechaActualizacion?: Date;

    @Column({
        type: "datetime",
        nullable: false,
        name: "fecha_expiracion",
        comment: "Fecha de expiracion del cupon"
    })
    fechaExpiracion!: Date;

    @ApiProperty({
        description: "Estado del cupon. 1: Activo, 2: Inactivo",
        example: 1,
        nullable: false,
        default: 1,
    })
    @Column({
        type: "int",
        nullable: false,
        default: 1,
        comment: "Estado del cupon. 1: Activo, 2: Inactivo"
    })
    estado?: number;

    @OneToMany(() => DetalleVentaEntity, detalleVenta => detalleVenta.cupon)
    detallesVentas?: DetalleVentaEntity[];

}
