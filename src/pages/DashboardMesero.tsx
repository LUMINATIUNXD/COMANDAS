import { Action, Card, Title } from "../components/UI";
import Icon from "../components/Icon";
import ListaPedidos from "../components/ListaPedidos";
import type { RestaurantTable } from "../data/demo";
import type { ServiceOrder } from "../data/service";
import type { Navigate } from "../types/navigation";

export default function DashboardMesero({ go, orders, openOrder }: {
  go: Navigate;
  orders: ServiceOrder[];
  openOrder: (table: RestaurantTable) => void;
}) {
  const ready = orders.filter((order) => order.status === "Listo");
  const counts = [
    { label: "Mesas a mi cargo", value: orders.length },
    { label: "Por confirmar en caja", value: orders.filter((order) => order.status === "Por confirmar").length },
    { label: "Listos para servir", value: ready.length },
    { label: "Cuentas solicitadas", value: orders.filter((order) => order.status === "Por cobrar").length },
  ];
  return <>
    <div className="page-heading flex items-center justify-between gap-5">
      <Title title="Mi turno">Ana · Salón principal</Title>
      <Action onClick={() => go("mesas")}>Ver mesas <Icon name="flecha" size={18} /></Action>
    </div>
    <dl className="metrics-strip grid grid-cols-4">
      {counts.map((item) => <div key={item.label}><dt>{item.label}</dt><dd className="num">{item.value}</dd></div>)}
    </dl>
    <Card>
      <div className="section-heading"><h2>Listos para servir</h2><span className="muted">Cocina confirmó</span></div>
      <ListaPedidos orders={ready} openOrder={openOrder} empty="No tienes pedidos listos por recoger." />
    </Card>
    <Card className="waiter-orders-card">
      <div className="section-heading"><h2>Mis pedidos en curso</h2><button className="text-button" onClick={() => go("pedidos")}>Ver todos <Icon name="flecha" size={16} /></button></div>
      <ListaPedidos orders={orders.filter((order) => order.status !== "Listo")} openOrder={openOrder} empty="No tienes otros pedidos en curso." />
    </Card>
  </>;
}
