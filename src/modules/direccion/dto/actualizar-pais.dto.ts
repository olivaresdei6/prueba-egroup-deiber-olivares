import { CrearPaisDto } from "./";
import { PartialType } from "@nestjs/swagger";


export class ActualizarPaisDto extends PartialType(CrearPaisDto) {}
