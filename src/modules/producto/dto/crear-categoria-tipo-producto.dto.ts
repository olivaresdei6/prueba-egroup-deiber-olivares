import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CrearCategoriaTipoProductoDto {
    @ApiProperty({
        description: "Descripción de la relación entre categoría y tipo de producto",
        example: "Una categoría puede tener varios tipos de producto",
        uniqueItems: true
    })
    @IsString({message: "La descripción debe ser un texto"})
    @MinLength(3, {message: "La descripción debe tener mínimo 3 caracteres"})
    @MaxLength(500, {message: "La descripción debe tener máximo 500 caracteres"})
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        description: "Observación de la asociación entre categoria y tipo de producto",
        example: "Los termos pertenecen a la categoría de accesorios y a la categoría de cocina",
        nullable: true,
    })
    @IsString({message: "Las observaciones deben ser un texto"})
    @MinLength(3, {message: "Las observaciones deben tener mínimo 3 caracteres"})
    @MaxLength(500, {message: "Las observaciones deben tener máximo 500 caracteres"})
    @IsOptional()
    observacion?: string;

    @ApiProperty({
        description: "UUID de la categoría",
        example: "c4a3f0a0-0f1a-4f1a-8f1a-0f1a0f1a0f1a",
        uniqueItems: true
    })
    @IsString({message: "El UUID debe ser un texto"})
    @IsNotEmpty({message: "El UUID no puede estar vacío"})
    uuidCategoria!: string;

    @ApiProperty({
        description: "UUID del tipo de producto",
        example: "c4a3f0a0-0f1a-4f1a-8f1a-0f1a0f1a0f1a",
        uniqueItems: true
    })
    @IsString({message: "El UUID debe ser un texto"})
    @IsNotEmpty({message: "El UUID no puede estar vacío"})
    uuidTipoProducto!: string;
}
