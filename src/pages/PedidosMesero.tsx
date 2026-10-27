import { useState } from "react";
import { Card, Title } from "../components/UI";
import ListaPedidos from "../components/ListaPedidos";
import type { RestaurantTable } from "../data/demo";
import type { ServiceOrder } from "../data/service";

export default function PedidosMesero({ orders, openOrder }: {
  orders: ServiceOrder[];
  openOrder: (table: RestaurantTable) => void;
}) {
  const [filter, setFilter] = useState("Todos");
  const visible = filter === "Todos" ? orders : orders.filter((order) => order.status === filter);
  return <>
    <div className="page-heading"><Title title="Mis pedidos">{orders.length} pedidos activos · Ana</Title></div>
    <div className="category-tabs" aria-label="Filtrar mis pedidos">
      {["Todos", "Por confirmar", "En cocina", "Listo", "Por cobrar"].map((item) => <button key={item} type="button" aria-pressed={item === filter} onClick={() => setFilter(item)}>{item}</button>)}
    </div>
    <Card><ListaPedidos orders={visible} openOrder={openOrder} empty="No tienes pedidos en este estado." /></Card>
  </>;
}
