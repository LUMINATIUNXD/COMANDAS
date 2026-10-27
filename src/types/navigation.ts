export type Page =
  | "acceso"
  | "inicio-mesero"
  | "pedidos"
  | "caja"
  | "inventario"
  | "resumen"
  | "mesas"
  | "nueva"
  | "detalle"
  | "cocina"
  | "cierre"
  | "productos"
  | "menu";

export type Navigate = (page: Page) => void;

export type Role = "mesero" | "cajero" | "administrador" | "cocina";
