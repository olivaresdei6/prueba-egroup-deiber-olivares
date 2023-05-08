import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UsuarioEntity } from "./usuario.entity";
import { DetalleVentaEntity } from "./detalle_venta.entity";
import { DireccionEntity } from "./direccion.entity";

@Entity({name: 'venta'})
export class VentaEntity {

    @ApiProperty({
        description: 'Identificador único de cada cupon',
        example: 1,
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('increment', {
        type: 'bigint',
        comment: 'Identificador único de cada cupon',
        unsigned: true,
    })
    id?: number;

    @ApiProperty({
        description: 'Identificador único de cada cupon',
        example: 1,
        uniqueItems: true,
    })
    @Column({
        type: "varchar",
        length: 36,
        nullable: false,
        unique: true,
        comment: "UUID de la cupon.  Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: 'Valor total de la cupon',
        example: 100000,
    })
    @Column({
        type: 'decimal',
        nullable: false,
        precision: 10,
        name: 'valor_neto',
        comment: 'Valor total de la cupon'
    })
    valorNeto?: number;

    @ApiProperty({
        description: 'Descrición de la cupon',
        example: 'Venta de 2 productos',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        name: 'descripcion',
        comment: 'Descripción de la cupon'
    })
    descripcion?: string;

    @ApiProperty({
        description: 'Fecha de la cupon',
        example: '2024-01-01 00:00:00'
    })
    @Column({
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
        name: "fecha_venta",
        comment: "Fecha de la cupon. Se genera automáticamente al momento de crear el registro"
    })
    fechaSolicitudVenta?: Date;

    @ApiProperty({
        description: "Fecha de la modificación de la cupon",
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
        description: 'Observaciones de la cupon',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        comment: 'Observaciones de la cupon',
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
        comment: "Estado de la cupon (1: vendido, 0: cupon cancelada, 2: cupon en proceso, 3: cupon devuelta)"
    })
    estado?: number;

    @ApiProperty({
        description: 'Identificador único del usuario al que se le realizó la cupon',
        example: 1,
    })
    @ManyToOne(() => UsuarioEntity, usuario => usuario.id, {eager: true, nullable: false})
    @JoinColumn({name: 'id_usuario'})
    usuario!: number | UsuarioEntity;

    @ApiProperty({
        description: 'Identificador de los detalles de la cupon',
        example: 1,
    })
    @OneToMany(() => DetalleVentaEntity, detalleVenta => detalleVenta.id, {eager: true, nullable: true})
    detallesVenta?: DetalleVentaEntity[];

    @ApiProperty({
        description: 'Identificador de la dirección de la cupon',
        example: 1,
    })
    @ManyToOne(() => DireccionEntity, direccion => direccion.id, {eager: true, nullable: true})
    @JoinColumn({name: 'id_direccion'})
    direccion?: number | DireccionEntity;

}
