import { useState } from "react";
import { Badge, Card, Title } from "../components/UI";
import ListaPedidos from "../components/ListaPedidos";
import { money, orderTotal, type RestaurantTable } from "../data/demo";
import type { ServiceOrder } from "../data/service";

export default function Caja({ orders, openOrder }: {
  orders: ServiceOrder[];
  openOrder: (table: RestaurantTable) => void;
}) {
  const [filter, setFilter] = useState("Por confirmar");
  const pending = orders.filter((order) => order.status === "Por confirmar");
  const charge = orders.filter((order) => order.status === "Por cobrar");
  const paid = orders.filter((order) => order.status === "Pagado");
  const tabs = [
    { label: "Por confirmar", orders: pending },
    { label: "Por cobrar", orders: charge },
    { label: "En servicio", orders: orders.filter((order) => ["En cocina", "Listo"].includes(order.status)) },
  ];
  const visible = tabs.find((tab) => tab.label === filter)!.orders;
  const collected = paid.reduce((sum, order) => sum + orderTotal(order.details.items), 0);
  return <>
    <div className="page-heading flex items-center justify-between gap-5">
      <Title title="Caja">Luis · Caja 01</Title><span className="quiet-label">Turno abierto</span>
    </div>
    <dl className="metrics-strip grid grid-cols-4">
      <div><dt>Pedidos por confirmar</dt><dd className="num">{pending.length}</dd></div>
      <div><dt>Cuentas por cobrar</dt><dd className="num">{charge.length}</dd></div>
      <div><dt>Importe por cobrar</dt><dd className="num">{money(charge.reduce((sum, order) => sum + orderTotal(order.details.items), 0))}<small>MXN</small></dd></div>
      <div><dt>Cobrado en esta prueba</dt><dd className="num">{money(collected)}<small>MXN</small></dd></div>
    </dl>
    <div className="category-tabs cashier-tabs" aria-label="Bandejas de caja">
      {tabs.map((tab) => <button key={tab.label} type="button" aria-pressed={tab.label === filter} onClick={() => setFilter(tab.label)}>{tab.label}<span className="queue-count">{tab.orders.length}</span></button>)}
    </div>
    <Card>
      <div className="section-heading"><h2>{filter === "Por confirmar" ? "Revisar y enviar a cocina" : filter === "Por cobrar" ? "Cuentas solicitadas por meseros" : "Pedidos confirmados"}</h2></div>
      <ListaPedidos orders={visible} openOrder={openOrder} showAmount empty={filter === "Por confirmar" ? "No hay pedidos pendientes de confirmar." : filter === "Por cobrar" ? "No hay cuentas pendientes de cobro." : "Todavía no hay pedidos en servicio."} />
    </Card>
    {paid.length > 0 && <Card className="waiter-orders-card">
      <div className="section-heading"><h2>Cobros de esta prueba</h2><Badge>{paid.length} {paid.length === 1 ? "cobro" : "cobros"}</Badge></div>
      <ul className="receipt-list">{paid.map((entry) => <li key={entry.details.id}><span>Mesa {entry.table.number} · {entry.payment}</span><strong className="num">{money(orderTotal(entry.details.items))}</strong></li>)}</ul>
    </Card>}
    <p className="demo-caption">Confirmaciones y cobros de muestra. Al recargar se reinicia la prueba.</p>
  </>;
}
