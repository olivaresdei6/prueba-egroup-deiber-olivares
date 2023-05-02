import { CrearTipoDeProductoDto } from "./crear-tipo-de-producto.dto";
import { PartialType } from "@nestjs/swagger";


export class ActualizarTipoDeProductoDto extends PartialType(CrearTipoDeProductoDto) {}
