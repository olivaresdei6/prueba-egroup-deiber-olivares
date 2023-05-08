import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";


export class CrearPrecioDto {
    @ApiProperty({
        description: 'Precio del producto',
        example: 1899876,
        required: true,
    })
    @IsNotEmpty({ message: 'El precio es requerido' })
    @IsNumber({}, { message: 'El precio debe ser un número' })
    precio!: number;

    @ApiProperty({
        description: 'Precio del producto sin iva',
        example: 1899876,
        required: true,
    })
    @IsNotEmpty({ message: 'El precio sin iva es requerido' })
    @IsNumber({}, { message: 'El precio sin iva debe ser un número' })
    precioSinIva!: number;

    @ApiProperty({
        description: 'Precio del producto con iva',
        example: 1899876,
        required: true,
    })
    @IsNotEmpty({ message: 'El precio con iva es requerido' })
    @IsNumber({}, { message: 'El precio con iva debe ser un número' })
    precioConIva!: number;

    @ApiProperty({
        description: 'Ganancia por precio',
        example: 1899876,
        required: true,
    })
    @IsNotEmpty({ message: 'La ganancia es requerida' })
    @IsNumber({}, { message: 'La ganancia debe ser un número' })
    ganancia!: number;

    @ApiProperty({
        description: 'Ganacia del producto sin iva',
        example: 1899876,
        required: true,
    })
    @IsNotEmpty({ message: 'La ganancia sin iva es requerida' })
    @IsNumber({}, {message: 'La ganancia sin iva debe ser un número' })
    gananciaSinIva!: number;

    @ApiProperty({
        description: 'Ganancia del producto con iva',
        example: 1899876,
        required: true,
    })
    @IsNotEmpty({ message: 'La ganancia con iva es requerida' })
    @IsNumber({}, { message: 'La ganancia con iva debe ser un número' })
    gananciaConIva!: number;

    @ApiProperty({
    description: "Descripción del registro",
    example: "Este precio es el precio de venta al público",
})
    @IsString({ message: 'La descripción debe ser un texto' })
    @MaxLength(500, { message: 'La descripción no puede contener más de 500 caracteres' })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Observaciones del registro',
        nullable: true
    })
    @IsString({ message: 'Las observaciones deben ser un texto' })
    @MaxLength(500, { message: 'Las observaciones no pueden contener más de 500 caracteres' })
    @IsOptional()
    observacion?: string;
}
