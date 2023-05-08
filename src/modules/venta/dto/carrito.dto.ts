import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsUUID, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CarritoDto {

    @ApiProperty({
        description: 'Indica si la compra se hará a domicilio o si se recogerá en tienda',
        example: true,
    })
    @IsOptional()
    @IsBoolean({message: 'El campo es un booleano'})
    esADomicilio?: boolean;

    @ApiProperty({
        description: 'UUID de la dirección de envío',
        example: 'a76b0a8c-7f1a-4f1a-8f1a-4f1a8f1a8f1a'
    })
    @IsOptional()
    @IsUUID('4', {message: 'El uuid debe ser un UUID válido'})
    uuidDireccion?: string;

    @ApiProperty({
        description: 'Arreglo de productos a agregar al carrito',
        example: [
            {
                cantidadSolicitada: 1,
                uuidProducto: 'a76b0a8c-7f1a-4f1a-8f1a-4f1a8f1a8f1a',
                uuidCupon: 'a76b0a8c-7f1a-4f1a-8f1a-4f1a8f1a8f1a',
                descripcion: 'Producto de prueba',
                observacion: 'Producto de prueba',
            }
        ],
        uniqueItems: true,
    })
    @IsArray({message: 'El campo debe ser un arreglo'})
    @ValidateNested({each: true})
    @Type(() => ProductoDto)
    productos?: ProductoDto[];


    @ApiProperty({
        description: 'Descripción de la venta',
        example: 'Producto de prueba',
    })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        description: 'Observaciones de la venta',
        example: 'Producto de prueba',
    })
    @IsOptional()
    observacion?: string;
}

// Se crea un dto para que se pueda recibir un arreglo con los productos a agregar al carrito

export class ProductoDto {
    @ApiProperty({
        description: 'Cantidad de productos a agregar al carrito',
        example: 1,
    })
    @IsNumber({}, {message: 'La cantidad debe ser un número'})
    @Min(1, {message: 'La cantidad debe ser mayor a 0'})
    cantidadSolicitada!: number;

    @ApiProperty({
        description: 'Identificador único de cada producto',
        example: 'a76b0a8c-7f1a-4f1a-8f1a-4f1a8f1a8f1a',
        uniqueItems: true,
    })
    @IsUUID('4', {message: 'El uuid debe ser un UUID válido'})
    @IsOptional()
    uuidProducto?: string;

    @ApiProperty({
        description: 'Identificador único de cada cupon de un producto',
        example: 'a76b0a8c-7f1a-4f1a-8f1a-4f1a8f1a8f1a',
        uniqueItems: true,
    })
    @IsUUID('4', {message: 'El uuid debe ser un UUID válido'})
    @IsOptional()
    uuidCupon?: string;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Producto de prueba',
    })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        description: 'Observaciones del producto',
        example: 'Producto de prueba',
    })
    @IsOptional()
    observacion?: string;
}
