import { orderForTable, tables, type RestaurantTable, type OrderItem, type DemoOrder } from "./demo";

export type OrderStatus = "Borrador" | "Por confirmar" | "En cocina" | "Listo" | "Por cobrar" | "Pagado";
export type PaymentMethod = "Efectivo" | "Tarjeta" | "Transferencia";
export type ServiceOrder = {
  table: RestaurantTable;
  status: Exclude<OrderStatus, "Borrador">;
  waiterId: string;
  payment?: PaymentMethod;
  details: DemoOrder;
};
export type OrderDraft = { items: OrderItem[]; note: string };

export const initialServiceOrders: ServiceOrder[] = [
  { table: tables[0], status: "Listo", waiterId: "07", details: orderForTable(tables[0]) },
  { table: tables[1], status: "Por confirmar", waiterId: "07", details: orderForTable(tables[1]) },
  { table: tables[4], status: "Por cobrar", waiterId: "07", details: orderForTable(tables[4]) },
];

export const serviceStatus = (orders: ServiceOrder[], table: RestaurantTable): OrderStatus =>
  orders.find((order) => order.table.number === table.number && order.status !== "Pagado")?.status ?? "Borrador";

export const tableForService = (table: RestaurantTable, orders: ServiceOrder[]): RestaurantTable => {
  const order = orders.find((item) => item.table.number === table.number && item.status !== "Pagado");
  const wasPaid = orders.some((item) => item.table.number === table.number && item.status === "Pagado");
  if (!order && wasPaid) return { ...table, state: "Libre", detail: `${table.seats} lugares` };
  if (!order) return table;
  if (order.status === "Pagado")
    return { ...table, state: "Libre", detail: `${table.seats} lugares` };
  return {
    ...table,
    state: order.status === "Por cobrar" ? "Por cerrar" : "Ocupada",
    detail: "Comanda #" + order.details.id,
  };
};
