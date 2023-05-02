import { CrearProductoDto } from "./";
import { PartialType } from "@nestjs/swagger";


export class ActualizarProductoDto extends PartialType(CrearProductoDto) {}
