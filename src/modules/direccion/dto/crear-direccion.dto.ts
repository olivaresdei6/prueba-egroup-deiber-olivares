import { IsInt, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CrearDireccionDto {

    @ApiProperty({
        example: 'Calle 67 # 45 - 12',
        description: 'Dirección de la venta o compra',
        uniqueItems: true,
    })
    @IsString({message: "La dirección debe ser un texto"})
    @MinLength(3, {message: "La dirección debe tener al menos 3 caracteres"})
    nombre!: string;


    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Descripción de la dirección',
        nullable: true
    })
    @IsString({message: "La descripción debe ser un texto"})
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'observacion de la dirección',
        nullable: true
    })
    @IsString({message: "La observacion debe ser un texto"})
    @IsOptional()
    observacion?: string;

    @ApiProperty({
        example: 1,
        description: 'UUID de la ciudad',
    })
    @IsUUID('4', { message: 'El id de la ciudad debe ser un UUID válido' })
    uuidCiudad!: string;
}



