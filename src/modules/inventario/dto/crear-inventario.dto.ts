import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";


export class CrearInventarioDto {

    @ApiProperty({
        example: 10,
        description: "Cantidad de productos en el inventario",
    })
    @IsNumber({}, { message: "La cantidad comprada debe ser un número" })
    @Min(1, { message: "La cantidad comprada debe ser mayor a 0" })
    @IsNotEmpty({ message: "La cantidad comprada es requerida" })
    cantidadComprada!: number;

    @ApiProperty({
        example: 20,
        description: "Cantidad disponible de productos en el inventario",
    })
    @IsNumber({}, { message: "La cantidad disponible debe ser un número" })
    @Min(1, { message: "La cantidad disponible debe ser mayor a 0" })
    @IsNotEmpty({ message: "La cantidad disponible es requerida" })
    cantidadDisponible!: number;

    @ApiProperty({
        example: 10,
        description: "Cantidad reservada de productos en el inventario",
    })
    @IsNumber({}, { message: "La cantidad reservada debe ser un número" })
    @Min(0, { message: "La cantidad reservada debe ser mayor o igual a 0" })
    @IsOptional()
    cantidadReservada?: number;

    @ApiProperty({
        example: 'a78b1c9f-1c5a-4f1a-9f1a-1a1a1a1a1a1a',
        description: "Identificador del producto",
    })
    @IsNotEmpty({ message: "El uuid del producto es requerido" })
    @IsUUID('4', { message: "El uuid del producto debe ser un UUID válido" })
    uuidProducto!: string;

    @ApiProperty({
        example: 'a78b1c9f-1c5a-4f1a-9f1a-1a1a1a1a1a1a',
        description: "Identificador del precio",
    })
    @IsNotEmpty({ message: "El uuid del precio es requerido" })
    @IsUUID('4', { message: "El uuid del precio debe ser un UUID válido" })
    uuidPrecio!: string;

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
}
