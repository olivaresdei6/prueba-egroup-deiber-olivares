import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { generateUUID } from "../../../../helper/generateUUID";

@Entity({name: "categoria"})
export class CategoriaEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador de la categoría',
        type: 'number',
    })
    @PrimaryGeneratedColumn({
        name: "id",
        type: "bigint",
        unsigned: true,
        comment: "Identificador de la categoría",
    })
    id?: number;

    @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'Identificador único de la categoría',
        type: 'string',
    })
    @ApiProperty({
        description: "UUID del la categoría",
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
        comment: "UUID del categoria. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;


    @ApiProperty({
        example: "accesorios",
        description: "Nombre de la categoría",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 50,
        name: "nombre",
        comment: "Nombre de la categoría: Ropa, Accesorios, etc."
    })
    nombre!: string;


    @ApiProperty({
        description: "Descripción de la categoría",
        example: "Accesorios para todo tipo de ocasión",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: true,
        length: 500,
        name: "descripcion",
        comment: "Descripción de la categoría. Se puede dejar vacío"
    })
    descripcion?: string;

    @ApiProperty({
        description: "Observación de la categoría",
        example: "Los accesorios son de buena calidad",
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
        description: "Estado de la categoría. 1: Activo, 2: Inactivo",
        example: 1,
        nullable: false,
        default: 1,
    })
    @Column({
        type: "tinyint",
        nullable: false,
        default: 1,
        name: "estado",
        comment: "Estado de la categoría. 1: Activo, 2: Inactivo"
    })
    estado?: number;
}
