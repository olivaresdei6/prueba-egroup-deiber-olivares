import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UsuarioEntity } from "./usuario.entity";
import { DetalleVentaEntity } from "./detalle_venta.entity";
import { DireccionEntity } from "./direccion.entity";

@Entity({name: 'venta'})
export class VentaEntity {

    @ApiProperty({
        description: 'Identificador único de cada venta',
        example: 1,
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('increment', {
        type: 'bigint',
        comment: 'Identificador único de cada venta',
        unsigned: true,
    })
    id?: number;

    @ApiProperty({
        description: 'Identificador único de cada venta',
        example: 1,
        uniqueItems: true,
    })
    @Column({
        type: "varchar",
        length: 36,
        nullable: false,
        unique: true,
        comment: "UUID de la venta.  Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: 'Valor total de la venta',
        example: 100000,
    })
    @Column({
        type: 'decimal',
        nullable: false,
        precision: 10,
        name: 'valor_neto',
        comment: 'Valor total de la venta'
    })
    valorNeto?: number;

    @ApiProperty({
        description: 'Descrición de la venta',
        example: 'Venta de 2 productos',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        name: 'descripcion',
        comment: 'Descripción de la venta'
    })
    descripcion?: string;

    @ApiProperty({
        description: 'Fecha de la venta',
        example: '2024-01-01 00:00:00'
    })
    @Column({
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
        name: "fecha_venta",
        comment: "Fecha de la venta. Se genera automáticamente al momento de crear el registro"
    })
    fechaVenta?: Date;

    @ApiProperty({
        description: "Fecha de la modificación de la venta",
        example: "2024-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        name: "fecha_modificacion_venta",
        comment: "Fecha de modificación de la compra. Se genera automáticamente al momento de actualizar el registro",
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    fechaModificacionVenta?: Date;


    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Observaciones de la venta',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        comment: 'Observaciones de la venta',
        length: 500,
    })
    observacion?: string;

    @ApiProperty({
        description: 'Valor verdadero o falso si se tiene envío a domicilio',
        example: true,
    })
    @Column({
        type: "tinyint",
        nullable: false,
        default: 0,
        comment: "Valor verdadero o falso si se tiene envío a domicilio"
    })
    envioDomicilio?: boolean;

    @Column({
        type: "int",
        nullable: false,
        default: 1,
        comment: "Estado de la venta (1: vendido, 0: venta cancelada, 2: venta en proceso, 3: venta devuelta)"
    })
    estado?: number;

    @ApiProperty({
        description: 'Identificador único del usuario al que se le realizó la venta',
        example: 1,
    })
    @ManyToOne(() => UsuarioEntity, usuario => usuario.id, {eager: true, nullable: false})
    @JoinColumn({name: 'id_usuario'})
    usuario!: number | UsuarioEntity;

    @ApiProperty({
        description: 'Identificador de los detalles de la venta',
        example: 1,
    })
    @ManyToOne(() => DetalleVentaEntity, detalleVenta => detalleVenta.idVenta, {eager: true, nullable: false})
    @JoinColumn({name: 'id_detalle_venta'})
    detalleVenta!: number | DetalleVentaEntity;

    @ApiProperty({
        description: 'Identificador de la dirección de la venta',
        example: 1,
    })
    @ManyToOne(() => DireccionEntity, direccion => direccion.id, {eager: true, nullable: true})
    @JoinColumn({name: 'id_direccion'})
    direccion?: number | DireccionEntity;

}
