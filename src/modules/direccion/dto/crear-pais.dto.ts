import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CrearPaisDto {
    @ApiProperty({
        example: "Colombia",
        description: "Nombre del país",
        uniqueItems: true
    })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @MaxLength(100, { message: 'El nombre no puede tener más de 30 caracteres' })
    @MinLength(3, { message: 'El nombre debe tener mínimo 3 caracteres' })
    nombre!: string;

    @ApiProperty({
        example: "En este pais aun no tenemos sucursales",
        description: "Observaciones del país",
    })
    @IsString({ message: 'Las observaciones deben ser un texto' })
    @MaxLength(500, { message: 'Las observaciones no pueden tener más de 500 caracteres' })
    @IsOptional()
    observacion?: string;

    @ApiProperty({
        description: 'Descripción del país',
        example: 'Este es un país muy bonito'
    })
    @IsString({ message: 'La descripción debe ser un texto' })
    @MaxLength(500, { message: 'La descripción no puede tener más de 500 caracteres' })
    @IsOptional()
    descripcion?: string;
}
