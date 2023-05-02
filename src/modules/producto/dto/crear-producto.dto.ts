import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";


export class CrearProductoDto {
    @ApiProperty({
        example: "TERMO BUNJIE 1L",
        description: "Nombre del tipo de termo",
        uniqueItems: true
    })
    @IsString({message: "El nombre debe ser un texto"})
    @IsNotEmpty({message: "El nombre no puede estar vacío"})
    @MinLength(3, {message: "El nombre debe tener mínimo 3 caracteres"})
    @MaxLength(100, {message: "El nombre debe tener máximo 30 caracteres"})
    nombre!: string;

    @ApiProperty({
        example: "5b7eafed-3b2b-4b7a-8b0a-2b7e2a5b7eaf",
        description: "UUID del Tipo de producto",
        uniqueItems: true
    })
    @IsString({message: "El UUID del tipo de producto debe ser un texto"})
    @IsNotEmpty({message: "El UUID del tipo de producto no puede estar vacío"})
    @IsUUID("4", {message: "El UUID del tipo de producto debe ser un UUID valido"})
    uuidTipoProducto!: string;

    @ApiProperty({
        example: "5b7eafed-3b2b-4b7a-8b0a-2b7e2a5b7eaf",
        description: "UUID del Tipo de usuario",
    })
    @IsString({message: "El UUID del tipo de usuario debe ser un texto"})
    @IsNotEmpty({message: "El UUID del tipo de usuario no puede estar vacío"})
    @IsUUID("4", {message: "El UUID del tipo de usuario debe ser un UUID valido"})
    @IsOptional()
    uuidTipoUsuario?: string;

    @ApiProperty({
        example: 18,
        description: "Altura del producto",
        nullable: true,
    })
    @IsNumber({}, {message: "La altura debe ser un número"})
    altura?: number;

    @ApiProperty({
        example: 10,
        description: "Ancho del producto",
        nullable: false
    })
    @IsNumber({}, {message: "El ancho debe ser un número"})
    ancho?: number;


    @ApiProperty({
        description: "Descripción del tipo de producto",
        example: "Termos para todo tipo de usuario",
        uniqueItems: true
    })
    @IsString({message: "La descripción debe ser un texto"})
    @MinLength(3, {message: "La descripción debe tener mínimo 3 caracteres"})
    @MaxLength(500, {message: "La descripción debe tener máximo 500 caracteres"})
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        description: 'Garantía del producto en meses',
        example: 12,
        nullable: true,
        default: 0
    })
    @IsNumber({}, {message: "La garantía debe ser un número"})
    @IsOptional()
    garantia?: number;

    @ApiProperty({
        description: "UUID Color del producto",
        example: 'ob6b89-6b89-6b89-6b89-6b89ob6b89',
        nullable: true,
    })
    @IsString({message: "El color debe ser un texto"})
    @IsUUID("4", {message: "El UUID del color debe ser un UUID valido"})
    @IsOptional()
    uuidColor?: string;

    @ApiProperty({
        description: "Material del producto",
        example: 'ob6b89-6b89-6b89-6b89-6b89ob6b89',
        nullable: true,
    })
    @IsUUID("4", {message: "El UUID del material debe ser un UUID valido"})
    @IsOptional()
    uuidMaterial?: string;

    @ApiProperty({
        description: "Capacidad del producto",
        example: '2 Litros',
        nullable: true,
    })
    @IsString({message: "La capacidad debe ser un texto"})
    @IsOptional()
    capacidad?: string;

    @ApiProperty({
        description: "Peso del producto",
        example: 1,
        nullable: true,
    })
    @IsNumber({}, {message: "El peso debe ser un número"})
    @IsOptional()
    peso?: number;

    @ApiProperty({
        description: 'Observaciones de la categoría',
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    })
    @IsString({message: "Las observaciones deben ser un texto"})
    @MinLength(3, {message: "Las observaciones deben tener mínimo 3 caracteres"})
    @MaxLength(500, {message: "Las observaciones deben tener máximo 500 caracteres"})
    @IsOptional()
    observacion?: string;

    @ApiProperty({
        description: "Id de la 1 caracteristica importante que no se tiene como atributo, pero si como parametro, ejemplo: tipo de termo",
        example: 'ob6b89-6b89-6b89-6b89-6b89ob6b89',
        nullable: true,
    })
    @IsUUID("4", {message: "El UUID de la caracteristica 1 debe ser un UUID valido. Esta categoría debe estar registrado en la tabla de parametros"})
    @IsOptional()
    uuidCaracteristica1?: string;

    @ApiProperty({
        description: "El UUID del valor parametro de la primera caracteristica adicional que no se tiene como atributo. El valor de la caracteristica 1 debe estar registrado en la tabla de valores de parametros",
        example: 'ob6b89-6b89-6b89-6b89-6b89ob6b89',
        nullable: true,
    })
    @IsUUID("4", {message: "El UUID del valor parametro de la primera caracteristica adicional debe ser un UUID valido. El valor de la caracteristica 1 debe estar registrado en la tabla de valores de parametros"})
    @IsOptional()
    uuidValorCaracteristica1?: string;

    @ApiProperty({
        description: "Id de la segunda caracteristica importante que no se tiene como atributo, pero si como parametro, ejemplo: tipo de termo",
        example: 'ob6b89-6b89-6b89-6b89-6b89ob6b89',
        nullable: true,
    })
    @IsUUID("4", {message: "El UUID de la caracteristica 2 debe ser un UUID valido. Esta categoría debe estar registrado en la tabla de parametros"})
    @IsOptional()
    uuidCaracteristica2?: string;

    @ApiProperty({
        description: "El UUID del valor parametro de la segunda caracteristica adicional que no se tiene como atributo. El valor de la caracteristica 2 debe estar registrado en la tabla de valores de parametros",
        example: 'ob6b89-6b89-6b89-6b89-6b89ob6b89',
        nullable: true,
    })
    @IsUUID("4", {message: "El UUID del valor parametro de la segunda caracteristica adicional debe ser un UUID valido. El valor de la caracteristica 2 debe estar registrado en la tabla de valores de parametros"})
    @IsOptional()
    uuidValorCaracteristica2?: string;



}
