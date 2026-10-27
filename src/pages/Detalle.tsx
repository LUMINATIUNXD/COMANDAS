import Icon from "../components/Icon";
import { Action, Badge, Card, Summary, Title } from "../components/UI";
import { type DemoOrder, type RestaurantTable } from "../data/demo";
import type { Navigate } from "../types/navigation";
import type { Role } from "../types/navigation";
import type { OrderStatus } from "../data/service";
export default function Detalle({
  go,
  table,
  role,
  status,
  updateStatus,
  order,
}: {
  go: Navigate;
  table: RestaurantTable;
  role: Role;
  status: OrderStatus;
  updateStatus: (next: Exclude<OrderStatus, "Borrador">) => void;
  order: DemoOrder;
}) {
  const progress = ["Por confirmar", "En cocina", "Listo", "Por cobrar", "Pagado"];
  const step = progress.indexOf(status);
  const back = role === "mesero" ? "pedidos" : role === "cajero" ? "caja" : "cocina";
  return (
    <>
      <div className="page-heading flex items-center justify-between gap-5">
        <Title title={"Comanda #" + order.id}>
          Mesa {table.number} · Ana · {order.time} h
        </Title>
        <Badge warm={status === "Por confirmar" || status === "Por cobrar"} neutral={status === "Borrador"}>{status}</Badge>
      </div>
      <div className="detail-layout">
        <Card className="detail-ticket">
          <div className="order-summary-heading">
            <span>Mesa {table.number}</span>
            <span className="ticket-id">#{order.id}</span>
          </div>
          {role === "cocina" ? <ul className="prep-items">{order.items.map((item) => <li key={item.product.id}><span>{item.quantity}</span>{item.product.name}</li>)}</ul> : <Summary orderItems={order.items} />}
          {order.note && (
            <div className="kitchen-note">
              <span>Nota para cocina</span>
              <p>{order.note}</p>
            </div>
          )}
        </Card>
        <div className="detail-side">
          <Card>
            <h2>Estado del pedido</h2>
            <ol className="order-timeline">
              {[
                { label: "Confirmación de caja", detail: step >= 1 ? "Pedido confirmado" : "Pendiente de revisar" },
                { label: "En cocina", detail: step >= 1 ? "Recibido por cocina" : "Se envía después de confirmar" },
                { label: "Listo para servir", detail: step >= 2 ? "Cocina terminó el pedido" : "Esperando a cocina" },
                { label: "Cuenta solicitada", detail: step >= 3 ? "Caja puede cobrar la cuenta" : "Se solicita al terminar el servicio" },
              ].map((item, index) => <li key={item.label} className={step > index ? "done" : step === index ? "current" : ""}>
                <span>{step > index && <Icon name="check" size={15} />}</span>
                <div><strong>{item.label}</strong><small>{item.detail}</small></div>
              </li>)}
            </ol>
            {role === "cajero" && status === "Por confirmar" && <Action onClick={() => updateStatus("En cocina")}>
              Confirmar y enviar a cocina <Icon name="check" size={18} />
            </Action>}
            {role === "cajero" && ["Listo", "Por cobrar"].includes(status) && <Action onClick={() => go("cierre")}>
              Cobrar cuenta <Icon name="flecha" size={18} />
            </Action>}
            {role === "mesero" && status === "Listo" && <Action onClick={() => updateStatus("Por cobrar")}>
              Solicitar cuenta <Icon name="flecha" size={18} />
            </Action>}
            {role === "cocina" && status === "En cocina" && <Action onClick={() => updateStatus("Listo")}>
              Pedido listo <Icon name="check" size={18} />
            </Action>}
            <p className="demo-caption" aria-live="polite">{status === "Por confirmar" ? "Esperando confirmación de caja." : status === "Por cobrar" ? "Cuenta enviada a caja para cobrar." : status === "En cocina" ? "El pedido ya está en el monitor de cocina." : status === "Listo" ? "El pedido está listo para servir." : status === "Pagado" ? "Cuenta cobrada en la maqueta." : "Todavía no se ha enviado este pedido."}</p>
          </Card>
          <div className="detail-secondary">
            <button
              className="text-button"
              type="button"
              onClick={() => go(back)}
            >
              <Icon name="atras" size={17} />
              {role === "mesero" ? "Volver a mis pedidos" : role === "cajero" ? "Volver a caja" : "Volver a cocina"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
