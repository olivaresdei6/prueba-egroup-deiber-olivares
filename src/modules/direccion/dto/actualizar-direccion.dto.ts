import { CrearDireccionDto } from "./crear-direccion.dto";
import { PartialType } from "@nestjs/swagger";

export class ActualizarDireccionDto extends PartialType(CrearDireccionDto) {}
