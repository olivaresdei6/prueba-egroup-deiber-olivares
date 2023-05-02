import { PartialType } from "@nestjs/swagger";
import { CrearCategoriaTipoProductoDto } from "./";


export class ActualizarCategoriaTipoDeProductoDto extends PartialType(CrearCategoriaTipoProductoDto) {}
