import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";
import { ValorParametroEntity } from "./";

/**
 * Entidad que representa la tabla parametro. Esta tabla representa los parámetros que se pueden configurar en la aplicación. Ejemplo: colores, tipos de documento, tipos de usuario, etc.
 * Se agrupan tablas que tienen un comportamiento similar y campos similares para evitar la creación de tablas innecesarias
 */
@Entity("parametro")
export class ParametroEntity {
    @ApiProperty({
        example: 1,
        description: "Identificador del parámetro",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn({
        name: "id",
        type: "bigint",
        unsigned: true,
        comment: "Identificador del parámetro"
    })
    id: number;

    @ApiProperty({
        description: "UUID del parámetro",
        example: uuidv4(),
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        name: "uuid",
        comment: "UUID del parámetro. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid: string;


    @ApiProperty({
        example: "colores",
        description: "Nombre del parámetro",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 50,
        name: "nombre",
        comment: "Nombre del parámetro. Un parámetro puede ser: colores, tipos de documento, tipos de usuario, etc. Se agrupan tablas que tienen un comportamiento similar y campos similares para evitar la creación de tablas innecesarias"
    })
    nombre: string;

    @ApiProperty({
        description: "Descripción del parámetro",
        example: "Colores de los productos de la tienda",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: true,
        length: 100,
        name: "descripcion",
        comment: "Descripción del parámetro. Se utiliza para describir el parámetro y su funcionalidad. No es obligatorio, pero se recomienda llenar este campo para facilitar la comprensión de la funcionalidad del parámetro"
    })
    descripcion: string;

    @ApiProperty({
        description: "Fecha de creación del registro",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        name: "fecha_creacion",
        comment: "Fecha de creación del registro. Se genera automáticamente al momento de crear el registro"
    })
    fechaCreacion: Date;

    @ApiProperty({
        description: "Fecha de actualización del registro",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        name: "fecha_actualizacion",
        comment: "Fecha de actualización del registro. Se genera automáticamente al momento de actualizar el registro"
    })
    fechaActualizacion: Date;

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
    estado: number;

    /**
     * Relacione de uno a muchos con la tabla valor_parametro. Un parámetro puede tener muchos valores, pero un valor solo puede pertenecer a un parámetro
     * Esta relación se realiza a través del campo idParametro en la tabla valor_parametro.
     *
     * Este tipo de tabla se utiliza para almacenar los valores de los parámetros. Por ejemplo, si el parámetro es colores, los valores pueden ser: rojo, azul, verde, etc.
     * Es decir, tablas que tienen un comportamiento similar, campos similares y muy pocos datos.
     * Por ejemplo, si se creara una tabla para cada parámetro, se tendrían las siguientes tablas:
     *  - colores -> cuando mucho 20 registros
     *  - tipos_documento -> cuando mucho 10 registros
     *  - tipos_usuario -> cuando mucho 8 registros
     *  - tipos_producto -> cuando mucho 3 registros
     *  Por lo tanto, se recomienda crear una tabla para agrupar todos estos parámetros y sus valores en una sola tabla llamada valor_parametro
     *  y aplicarle una relación de uno a muchos con esta tabla.
      */
    @OneToMany(
        () => ValorParametroEntity,
        (valorParametro) => valorParametro.idParametro,
    )
    valoresParametro: ValorParametroEntity[];
}
