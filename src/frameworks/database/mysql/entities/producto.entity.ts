import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { generateUUID } from "../../../../helper/generateUUID";
import { ImageProductoEntity } from "./imagen_producto.entity";

@Entity({name: "producto"})
export class ProductoEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador de cada producto',
        type: 'number',
    })
    @PrimaryGeneratedColumn({
        name: "id",
        type: "bigint",
        unsigned: true,
        comment: "Identificador de cada producto"
    })
    id?: number;

    @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'Identificador único de cada producto',
        type: 'string',
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        name: "uuid",
        default: () => `${generateUUID()}`,
        comment: "UUID del producto. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;


    @ApiProperty({
        example: "TERMO BUNJIE 1L",
        description: "Nombre del tipo de termo",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 50,
        name: "nombre",
        comment: "Nombre del producto: TERMO BUNJIE 1L, TERMO BUNJIE 2L, etc"
    })
    nombre!: string;

    @ApiProperty({
        example: "TERMO",
        description: "Tipo de producto",
        uniqueItems: true
    })
    @Column({
        type: "number",
        nullable: false,
        name: "id_tipo_producto",
        comment: "Tipo de producto: TERMO, Reloj, etc"
    })
    idTipoProducto!: number;

    @ApiProperty({
        example: "Damas, Caballeros y Niños",
        description: "Tipo de usuario",
    })
    @Column({
        type: "number",
        nullable: false,
        name: "id_tipo_usuario",
        comment: "Tipo de usuario: Damas, Caballeros y Niños"
    })
    idTipoUsuario!: number;

    @ApiProperty({
        example: 18,
        description: "Altura del producto",
        nullable: true,
    })
    @Column({
        type: "decimal",
        nullable: true,
        precision: 10,
        scale: 2,
        name: "altura",
        comment: "Altura del producto"
    })
    altura!: number;

    @ApiProperty({
        example: 10,
        description: "Ancho del producto",
        nullable: false
    })
    @Column({
        type: "decimal",
        nullable: false,
        precision: 10,
        // Scale es la cantidad de decimales, 2 quiere decir que se pueden guardar 2 decimales
        scale: 2,
        name: "ancho",
        comment: "Ancho del producto"
    })
    ancho!: number;


    @ApiProperty({
        description: "Descripción del producto",
        example: "Este termo es de color rojo y tiene una capacidad de 1 litro",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: true,
        length: 500,
        name: "descripcion",
        comment: "Descripción del producto. Se puede dejar vacío"
    })
    descripcion?: string;

    @ApiProperty({
        description: 'Garantía del producto en meses',
        example: 12,
        nullable: true,
        default: 0
    })
    @Column({
        type: "tinyint",
        nullable: true,
        default: 0,
        name: "garantia",
        comment: "Garantía del producto en meses"
    })
    garantia?: number;

    @ApiProperty({
        description: "Color del producto",
        example: 1,
        nullable: true,
    })
    @Column({
        type: "number",
        nullable: true,
        name: "id_color",
        comment: "Color del producto"
    })
    idColor?: number;

    @ApiProperty({
        description: "Material del producto",
        example: 1,
        nullable: true,
    })
    @Column({
        type: "number",
        nullable: true,
        name: "id_material",
        comment: "Material del producto"
    })
    idMaterial?: number;

    @ApiProperty({
        description: "Capacidad del producto",
        example: '2 Litros',
        nullable: true,
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: true,
        name: "capacidad",
        comment: "Capacidad del producto"
    })
    capacidad?: number;

    @ApiProperty({
        description: "Peso del producto",
        example: 1,
        nullable: true,
    })
    @Column({
        type: "decimal",
        nullable: true,
        precision: 10,
        scale: 2,
        name: "peso",
        comment: "Peso del producto"
    })
    peso?: number;


    @ApiProperty({
        description: "Observación del producto",
        example: "El termo tuene garantia",
        nullable: true,
    })
    @Column({
        type: "varchar",
        nullable: true,
        length: 500,
        name: "observacion",
        comment: "Observación de la categoría. Se puede dejar vacío"
    })
    observacion?: string;

    @ApiProperty({
        description: "Id de la 1 caracteristica importante que no se tiene como atributo, pero si como parametro, ejemplo: tipo de termo",
        example: 1,
        nullable: true,
    })
    @Column({
        type: 'int',
        nullable: true,
        name: "id_caracteristicaAdicional1",
        comment: "Id de la 1 caracteristica importante que no se tiene como atributo, pero si como parametro, ejemplo: tipo de termo"
    })
    idCaracteristicaAdicional1?: string;

    @ApiProperty({
        description: "id del valor parametro de la primera caracteristica adicional que no se tiene como atributo",
        example: 1,
        nullable: true,
    })
    @Column({
        type: "int",
        nullable: true,
        name: "id_valor_caracteristicaAdicional1",
        comment: "Id del valor parametro de la primera caracteristica adicional que no se tiene como atributo",
        unsigned: true
    })
    valorCaracteristicaAdicional1?: string;

    @ApiProperty({
        description: "Id de la 2 caracteristica importante que no se tiene como atributo, pero si como parametro, ejemplo: tipo de tapa",
        example: 2,
        nullable: true,
    })
    @Column({
        type: 'int',
        nullable: true,
        name: "id_caracteristicaAdicional2",
        comment: "Id de la 2 caracteristica importante que no se tiene como atributo, pero si como parametro, ejemplo: tipo de termo"
    })
    idCaracteristicaAdicional2?: string;

    @ApiProperty({
        description: "id del valor parametro de la segunda caracteristica adicional que no se tiene como atributo",
        example: 1,
        nullable: true,
    })
    @Column({
        type: "int",
        nullable: true,
        name: "id_valor_caracteristicaAdicional2",
        comment: "Id del valor parametro de la segunda caracteristica adicional que no se tiene como atributo",
        unsigned: true
    })
    valorCaracteristicaAdicional2?: string;


    @ApiProperty({
        description: "Estado del producto. 1: Activo, 2: Inactivo",
        example: 1,
        nullable: false,
        default: 1,
    })
    @Column({
        type: "tinyint",
        nullable: false,
        default: 1,
        name: "estado",
        comment: "Estado del producto. 1: Activo, 2: Inactivo"
    })
    estado?: number;

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

    @OneToMany(() => ImageProductoEntity, imageProducto => imageProducto.idProducto)
    imagesProducto?: ImageProductoEntity[];
}
