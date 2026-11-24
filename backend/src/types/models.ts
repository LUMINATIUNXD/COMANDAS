export type EstadoComanda = "por_confirmar" | "en_cocina" | "lista" | "entregada" | "por_cobrar" | "pagada";
export type ItemEntrada = { id_producto: number; cantidad: number };
export type CrearComanda = {
  id_usuario?: number | null; id_cliente?: number | null; num_mesa: number;
  origen: "mesero" | "app"; items: ItemEntrada[];
};
