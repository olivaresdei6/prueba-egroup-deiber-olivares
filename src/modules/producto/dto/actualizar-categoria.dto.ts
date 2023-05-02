import { CrearCategoriaDto } from "./";
import { PartialType } from "@nestjs/swagger";


export class ActualizarCategoriaDto extends PartialType(CrearCategoriaDto) {}
