import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { generateUUID } from "../../../../helper/generateUUID";
import { TipoProductoEntity } from "./tipo_producto.entity";
import { CategoriaEntity } from "./categoria.entity";

@Entity({ name: "categoria_tipo_producto" })
export class CategoriaTipoProductoEntity {
    @ApiProperty({
        name: "id_categoria",
        description: "Identificador de la categoría",
        type: "number",
        example: 1
    })
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ApiProperty({
        example: "9n6bc-9n6bc-9n6bc-9n6bc-9n6bc",
        description: "UUID de la relacion entre categoria y tipo de producto",
        nullable: false
    })
    @Column({
        type: "varchar",
        length: 36,
        nullable: false,
        unique: true,
        default: () => `${generateUUID()}`,
        comment: "UUID de la imagen.  Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: "Fecha de creación del registro",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
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
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    fechaActualizacion?: Date;

    @ApiProperty({
        description: "Estado del registro. 0: Inactivo, 1: Activo",
        example: 1,
        nullable: false
    })
    @Column({
        type: "tinyint",
        nullable: false,
        comment: "Estado del registro. 0: Inactivo, 1: Activo",
        default: 1
    })
    estado?: number;

    @ApiProperty({
        description: "Id del tipo de producto",
        example: 1,
        nullable: false,
        required: true
    })
    @ManyToOne(() => TipoProductoEntity,
        tipoProducto => tipoProducto.id,
        { eager: true, nullable: false }
    )
    @JoinColumn({ name: "id_tipo_producto" })
    tipoProducto!: number | TipoProductoEntity;

    @ApiProperty({
        description: "id de la categoria",
        example: 1,
        nullable: false,
        required: true
    })
    @ManyToOne(()=> CategoriaEntity,
        categoria => categoria.id,
        {eager: true, nullable: false}
    )
    @JoinColumn({name: "id_categoria"})
    categoria!: number | CategoriaEntity;

}


