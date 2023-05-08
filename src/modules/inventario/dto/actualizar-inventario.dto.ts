import { CrearInventarioDto } from "./crear-inventario.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class ActualizarInventarioDto {
    @ApiProperty({
        example: 'Este inentario es para el termo Bonafont de 1 litro',
        description: 'Descripción del inventario',
    })
    @IsString({ message: "La descripción debe ser un string" })
    @MaxLength(500, { message: "La descripción no puede contener más de 500 caracteres" })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'Este inentario es para el termo Bonafont de 1 litro',
        description: 'Observación del inventario',
    })
    @IsString({ message: "La observación debe ser un string" })
    @MaxLength(500, { message: "La observación no puede contener más de 500 caracteres" })
    @IsOptional()
    observacion?: string;

    @ApiProperty({
        example: 'a78b1c9f-1c5a-4f1a-9f1a-1a1a1a1a1a1a',
        description: "Identificador del precio",
    })
    @IsUUID('4', { message: "El uuid del precio debe ser un UUID válido" })
    @IsOptional()
    uuidPrecio?: string;

    @ApiProperty({
        example: 10,
        description: "Cantidad reservada de productos en el inventario",
    })
    @IsNumber({}, { message: "La cantidad reservada debe ser un número" })
    @IsOptional()
    cantidadReservada?: number;

    @ApiProperty({
        example: 20,
        description: "Cantidad disponible de productos en el inventario",
    })
    @IsNumber({}, { message: "La cantidad disponible debe ser un número" })
    @IsOptional()
    cantidadDisponible!: number;


}
