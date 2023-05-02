import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CrearTipoDeProductoDto {
    @ApiProperty({
        example: "accesorios",
        description: "Nombre de la categoría",
        uniqueItems: true
    })
    @IsString({message: "El nombre debe ser un texto"})
    @IsNotEmpty({message: "El nombre no puede estar vacío"})
    @MinLength(3, {message: "El nombre debe tener mínimo 3 caracteres"})
    @MaxLength(100, {message: "El nombre debe tener máximo 30 caracteres"})
    nombre!: string;

    @ApiProperty({
        example: "Accesorios para el hogar",
        description: "Descripción de la categoría",
    })
    @IsString({message: "La descripción debe ser un texto"})
    @MinLength(3, {message: "La descripción debe tener mínimo 3 caracteres"})
    @MaxLength(500, {message: "La descripción debe tener máximo 500 caracteres"})
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        description: 'Observaciones de la categoría',
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    })
    @IsString({message: "Las observaciones deben ser un texto"})
    @MinLength(3, {message: "Las observaciones deben tener mínimo 3 caracteres"})
    @MaxLength(500, {message: "Las observaciones deben tener máximo 500 caracteres"})
    @IsOptional()
    observacion?: string;
}
