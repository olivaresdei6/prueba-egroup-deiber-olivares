import { ApiProperty } from "@nestjs/swagger";
import {
    IS_ISO8601,
    IsDate,
    IsDateString,
    IsISO8601,
    IsNumber, IsOptional,
    IsString,
    IsUUID, Matches,
    Max,
    Min,
    MinLength
} from "class-validator";

export class CrearCuponDto{
    @ApiProperty({
        example: 18,
        description: 'Porcentaje de descuento',
        type: 'number',
        minimum: 1,
        maximum: 100,
    })
    @IsNumber({},{message: 'El porcentaje de descuento debe ser un número'})
    @Min(1,{message: 'El porcentaje de descuento debe ser mayor a 0'})
    @Max(100,{message: 'El porcentaje de descuento debe ser menor a 100'})
    porcentajeDescuento!: number;

    @ApiProperty({
        example: 20,
        description: 'Cantidad de cupones a generar',
        type: 'number',
        minimum: 1,
    })
    @IsNumber({},{message: 'La cantidad de cupones debe ser un número'})
    @Min(1,{message: 'La cantidad de cupones debe ser mayor a 0'})
    cantidadUsos!: number;


    @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'UUID del tipo de cupon',
        type: 'string',
    })
    @IsUUID('4',{message: 'El tipo de cupon debe ser un UUID'})
    uuidTipoCupon!: string;

    @ApiProperty({
    example: 'Cupon de deescuento del 16%',
    description: 'Descripción del cupon'
})
    @IsString({message: 'La descripción del cupon debe ser un string'})
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
    example: 'Cupón de descuento valido solo para compras mayores a $100.000',
    description: 'Observación del cupon',
})
    @IsString({message: 'La observación del cupon debe ser un string'})
    @IsOptional()
    observacion?: string;

    @ApiProperty({
        example: '2021-10-10',
        description: 'Fecha de expiración del cupon',
        type: 'string',
    })
    @MinLength(10, {message: "La fecha de fin de la solicitud debe tener al menos 10 caracteres"})
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, {message: "La fecha de fin de la solicitud debe tener el formato YYYY-MM-DD"})
    fechaExpiracion!: string;
}
