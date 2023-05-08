import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { TipoProductoEntity } from "./tipo_producto.entity";
import { CategoriaEntity } from "./categoria.entity";

@Entity({ name: "categoria_tipo_producto" })
@Index(["categoria", "tipoProducto"], { unique: true })
export class CategoriaTipoProductoEntity {
    @ApiProperty( {
        name: "id_categoria",
        description: "Identificador de la categoría",
        type: "number",
        example: 1
    })
    @PrimaryGeneratedColumn('increment', {
        type: "smallint",
        unsigned: true,
        comment: "Identificador de la asociación entre categoria y tipo de producto"
    })
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
        comment: "UUID de la imagen.  Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: "Descripción de la relación entre categoría y tipo de producto",
        example: "Una categoría puede tener varios tipos de producto",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: true,
        length: 500,
        name: "descripcion",
        comment: "Descripción de la asociación entre categoria y tipo de producto. Se puede dejar vacío"
    })
    descripcion?: string;

    @ApiProperty({
        description: "Observación de la asociación entre categoria y tipo de producto",
        example: "Los termos pertenecen a la categoría de accesorios y a la categoría de cocina",
        nullable: true,
    })
    @Column({
        type: "varchar",
        nullable: true,
        length: 500,
        name: "observacion",
        comment: "Observación de la asociación. Se puede dejar vacío"
    })
    observacion?: string;

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
        nullable: true,
        name: "fecha_actualizacion",
        comment: "Fecha de actualización del registro. Se genera automáticamente al momento de actualizar el registro",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    fechaActualizacion?: Date;

    @ApiProperty({
        description: "Estado del registro. 0: Inactivo, 1: Activo",
        example: 1,
        nullable: false
    })
    @Column({
        type: "int",
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
    @ManyToOne(() => TipoProductoEntity, tipoProducto => tipoProducto.id, { eager: true, nullable: false })
    @JoinColumn({ name: "id_tipo_producto" })
    tipoProducto!: number | TipoProductoEntity;

    @ApiProperty({
        description: "id de la categoria",
        example: 1,
        nullable: false,
        required: true
    })
    @ManyToOne(()=> CategoriaEntity, categoria => categoria.id, {eager: true, nullable: false})
    @JoinColumn({name: "id_categoria"})
    categoria!: number | CategoriaEntity;

}


