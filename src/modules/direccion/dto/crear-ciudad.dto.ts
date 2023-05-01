import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CrearCiudadDto {
    @ApiProperty({
        example: "Barranquilla",
        description: "Nombre del país",
        uniqueItems: true
    })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @MaxLength(100, { message: 'El nombre no puede tener más de 30 caracteres' })
    @MinLength(3, { message: 'El nombre debe tener mínimo 3 caracteres' })
    nombre!: string;

    @ApiProperty({
        example: "En esta ciudad aun no tenemos sucursales",
        description: "Observaciones de la ciudad",
    })
    @IsString({ message: 'Las observaciones deben ser un texto' })
    @MaxLength(500, { message: 'Las observaciones no pueden tener más de 500 caracteres' })
    @IsOptional()
    observacion?: string;

    @ApiProperty({
        description: 'Descripción de la ciudad',
        example: 'Esta es una ciudad es muy bonita'
    })
    @IsString({ message: 'La descripción debe ser un texto' })
    @MaxLength(500, { message: 'La descripción no puede tener más de 500 caracteres' })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: "b67n8nm-9b7n8m-9b7n8m-9b7n8m",
        description: "Id del departamento al que pertenece el departamento",
    })
    @IsString({ message: 'El id del departamento debe ser un texto' })
    @IsUUID('all', { message: 'El id del departamento debe ser un UUID válido' })
    uuidDepartamento!: string;


}
