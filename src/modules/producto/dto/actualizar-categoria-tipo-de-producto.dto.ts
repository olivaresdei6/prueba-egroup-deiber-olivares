import { CrearTipoDeProductoDto } from "./crear-tipo-de-producto.dto";
import { PartialType } from "@nestjs/swagger";
import { CrearCategoriaTipoProductoDto } from "./";


export class ActualizarCategoriaTipoDeProductoDto extends PartialType(CrearCategoriaTipoProductoDto) {}
