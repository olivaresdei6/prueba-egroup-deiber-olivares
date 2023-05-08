import { CrearPrecioDto } from "./crear-precio.dto";
import { PartialType } from "@nestjs/swagger";


export class ActualizarPrecioDto extends PartialType(CrearPrecioDto) {}
