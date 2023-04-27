import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { generateUUID } from "../../../../helper/generateUUID";
import { ProductoEntity } from "./producto.entity";

@Entity({name: "tipo_de_producto"})
export class TipoProductoEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador de esta tabla'
    })
    @PrimaryGeneratedColumn({type: 'int', unsigned: true, zerofill: true})
    id: number;

    @ApiProperty({
        description: "UUID del tipo de producto",
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        name: "uuid",
        default: () => `${generateUUID()}`,
        comment: "UUID del tipo de producto. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        example: "termo",
        description: "Nombre del tipo de producto",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 100,
        name: "nombre",
        comment: "Nombre del tipos de producto que existen en la base de datos."
    })
    nombre!: string;

    @ApiProperty({
        description: "Descripción del tipo de producto",
        example: "Termos para todo tipo de usuario",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: true,
        length: 500,
        name: "descripcion",
        comment: "Descripción del parámetro. Se utiliza para describir el parámetro y su funcionalidad. No es obligatorio, pero se recomienda llenar este campo para facilitar la comprensión de la funcionalidad del parámetro"
    })
    descripcion?: string;

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
        description: "Estado del registro. 1. Activo, 2. Inactivo, O. Eliminado",
        example: 1
    })
    @Column({
        type: "int",
        nullable: false,
        name: "estado",
        comment: "Estado del registro. 1. Activo, 2. Inactivo, O. Eliminado"
    })
    estado?: number;

    @OneToMany(() => ProductoEntity, producto => producto.producto)
    productos: ProductoEntity[];

}
