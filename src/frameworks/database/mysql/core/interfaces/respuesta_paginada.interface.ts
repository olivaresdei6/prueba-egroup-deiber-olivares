export interface RespuestaPaginadaInterface {
    cantidadTotalDeRegistros: number;
    paginasTotales: number,
    paginaActual: number,
    registrosPaginados: Object[];
}
