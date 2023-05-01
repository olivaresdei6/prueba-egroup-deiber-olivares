import { CrearDepartamentoDto } from "./";
import { PartialType } from "@nestjs/swagger";

export class ActualizarDepartamentoDto extends PartialType(CrearDepartamentoDto) {}
