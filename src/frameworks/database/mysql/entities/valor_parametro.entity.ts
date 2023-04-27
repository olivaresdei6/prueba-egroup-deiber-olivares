import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { generateUUID } from "../../../../helper/generateUUID";
import { ParametroEntity } from "./parametro.entity";

/**
 * Entidad que representa la tabla valor_parametro. Esta tabla representa los valores que se pueden configurar en la aplicación. Ejemplo: colores: #FFFFFF, #000000, #FF0000, etc.
 * Se agrupan tablas que tienen un comportamiento similar y campos similares para evitar la creación de tablas innecesarias
 */
@Entity("valor_parametro")
export class ValorParametroEntity {
    @ApiProperty({
        example: 1,
        description: "Identificador del valor parámetro",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn({
        name: "id",
        type: "int",
        unsigned: true,
        comment: "Identificador del valor parámetro"
    })
    id?: number;

    @ApiProperty({
        description: "UUID del valor parámetro",
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        name: "uuid",
        comment: "UUID del valor parámetro. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible",
        default: () => `${generateUUID()}`
    })
    uuid?: string;


    @ApiProperty({
        example: "#FFFFFF",
        description: "Valor del parámetro",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 100,
        name: "nombre",
        comment: "Nombre del valor parámetro. Son como las opciones que se pueden seleccionar en un select. Ejemplo: colores: #FFFFFF, #000000, #FF0000, etc. Un valor parametro es como si fuera una fila de una tabla. Se agrupan tablas que tienen un comportamiento similar y campos similares para evitar la creación de tablas innecesarias y se relacionan con la tabla parametro"
    })
    nombre!: string;

    @ApiProperty({
        description: "Descripción del valor parámetro",
        example: "Color blanco",
    })
    @Column({
        type: "varchar",
        length: 500,
        nullable: true,
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


    /**
     * Relacion de muchos a uno con la tabla parametro. Es decir, muchos valores parámetro pueden tener un mismo parámetro
     * o lo que es lo mismo, un parámetro puede tener muchos valores parámetro pero un valor parámetro solo puede tener un parámetro.
     * En terminos mas simples, un valor parámetro pertenece a un parámetro, es como si a la tabla de colores se le agregara una fila
     * con los datos: id: 1, uuid: uuidv4(), nombre: "#FFFFFF", descripcion: "Color blanco", fechaCreacion: "2021-01-01 00:00:00",
     * pero para ahorrar espacio en la base de datos, se crea una tabla de valores parámetro y se relaciona con la tabla de parámetros,
     * reduciando de forma considerable la creación de tablas innecesarias y que además tienen muy pocos datos.
     */
    @ApiProperty({
        description: "Identificador del parámetro",
        example: 1
    })
    @ManyToOne(
        () => ValorParametroEntity,
        valorParametro => valorParametro.id,
        {
            nullable: false,
            eager: true // Cuando se consulte un valor parámetro, se traerá el parámetro al que pertenece
        }
    )
    @JoinColumn({name: "id_parametro"})
    parametro!: number | ParametroEntity;
}
