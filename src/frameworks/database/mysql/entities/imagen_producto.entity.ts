import {
    Column,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ProductoEntity, ImagenEntity } from "./";

@Entity({name: 'imagen_producto'})
export class ImageProductoEntity {
    @ApiProperty({
        example: 1,
        description: 'Id de la imagen',
        nullable: false,
    })
    @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
    id?: number;

    @ApiProperty({
        example: '9n6bc-9n6bc-9n6bc-9n6bc-9n6bc',
        description: 'UUID de la imagen',
        nullable: false,
    })
    @Column({
        name: 'uuid',
        type: 'varchar',
        length: 36,
        nullable: false,
        unique: true,
        comment: 'UUID de la imagen.  Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible'
    })
    uuid?: string;

    @ApiProperty({
        description: 'Id del producto al que pertenece la imagen',
        example: 1,
        nullable: false
    })
    @ManyToOne(() => ImagenEntity, image => image.id, {eager: true, nullable: false})
    @JoinColumn({name: 'id_imagen'})
    imagen?: number | ImagenEntity;

    @ApiProperty({
        example: 2,
        description: 'Id del producto al que pertenece la imagen',
        nullable: false
    })
    @ManyToOne(() => ProductoEntity, producto => producto.id, {eager: true, nullable: false})
    @JoinColumn({name: 'id_producto_'})
    producto?: number | ProductoEntity;

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
        type: 'tinyint',
        nullable: false,
        name: 'estado',
        comment: 'Estado del registro. 0: Inactivo, 1: Activo',
        default: 1
    })
    estado?: number;
}
