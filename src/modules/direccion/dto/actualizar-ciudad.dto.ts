import { CrearCiudadDto } from "./";
import { PartialType } from "@nestjs/swagger";

export class ActualizarCiudadDto extends PartialType(CrearCiudadDto) {}
