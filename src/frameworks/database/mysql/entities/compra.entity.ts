import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UsuarioEntity } from "./usuario.entity";
import { DetalleCompraEntity } from "./detalle_compra.entity";
import { ProovedorEntity } from "./proovedor.entity";

@Entity({name: 'compra'})
export class CompraEntity {

    @ApiProperty({
        description: 'Identificador único de cada compra',
        example: 1,
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('increment', {
        type: 'bigint',
        comment: 'Identificador único de cada compra',
        unsigned: true,
    })
    id?: number;

    @ApiProperty({
        description: 'Identificador único de cada compra',
        example: 1,
        uniqueItems: true,
    })
    @Column({
        type: "varchar",
        length: 36,
        nullable: false,
        unique: true,
        comment: "UUID de la compra.  Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: 'Valor total de la compra',
        example: 100000,
    })
    @Column({
        type: 'decimal',
        nullable: false,
        precision: 10,
        name: 'valor_total',
        comment: 'Valor total de la compra'
    })
    valorTotalSinDescuento?: number;

    @ApiProperty({
        description: 'Valor total de la compra con descuento',
        example: 100000,
    })
    @Column({
        type: 'decimal',
        nullable: false,
        precision: 10,
        name: 'valor_total_con_descuento',
        comment: 'Valor total de la compra con descuento'
    })
    valorTotalConDescuento?: number;

    @ApiProperty({
        description: 'descuento de la compra',
        example: 14,
        default: 0
    })
    @Column({
        type: 'decimal',
        nullable: false,
        precision: 10,
        name: 'descuento',
        comment: 'descuento de la compra',
        default: 0
    })
    descuento?: number;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "Descripción de la compra. Ejemplo: Compra de 10 camisetas"
    })
    descripcion?: string;

    @Column({
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
        name: "fecha_compra",
        comment: "Fecha de la compra. Se genera automáticamente al momento de crear el registro"
    })
    fechaCompra?: Date;

    @ApiProperty({
        description: "Fecha de la modificación de la compra",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        name: "fecha_modificacion_compra",
        comment: "Fecha de modificación de la compra. Se genera automáticamente al momento de actualizar el registro",
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    fechaModificacionCompra?: Date;

    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Observaciones de la compra',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        comment: 'Observaciones de la compra',
        length: 500,
    })
    observacion?: string;

    @Column({
        type: "int",
        nullable: false,
        default: 1,
        comment: "Estado de la compra (1: comprado, 0: compra cancelada, 2: compra en proceso, 3: compra devuelta)"
    })
    estado?: number;

    @ApiProperty({
        description: 'Identificador único del usuario que realizó la compra',
        example: 1,
    })
    @ManyToOne(() => UsuarioEntity, usuario => usuario.id, {eager: true, nullable: false})
    @JoinColumn({name: 'id_usuario'})
    usuario!: number | UsuarioEntity;

    @ApiProperty({
        description: 'Identificador de los detalles de la compra',
        example: 1,
    })
    @ManyToOne(() => DetalleCompraEntity, detalleCompra => detalleCompra.idCompra, {eager: true, nullable: false})
    @JoinColumn({name: 'id_detalle_compra'})
    detalleCompra!: number | DetalleCompraEntity;

    @ApiProperty({
        description: 'Identificador deL proovedor de la compra',
        example: 1,
    })
    @ManyToOne(() => ProovedorEntity, proovedor => proovedor.id, {eager: true, nullable: false})
    @JoinColumn({name: 'id_proovedor'})
    proovedor!: number | ProovedorEntity;

}
