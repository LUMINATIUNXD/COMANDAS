import Icon from "../components/Icon";
import { Action, Title } from "../components/UI";
import { type RestaurantTable } from "../data/demo";
import type { ServiceOrder } from "../data/service";
export default function Cocina({
  viewTable,
  orders,
  markReady,
}: {
  orders: ServiceOrder[];
  viewTable: (table: RestaurantTable) => void;
  markReady: (table: RestaurantTable) => void;
}) {
  const cooking = orders.filter((order) => order.status === "En cocina");
  const ready = orders.filter((order) => order.status === "Listo");
  function ticket(entry: ServiceOrder) {
    const table = entry.table;
    const order = entry.details;
    return <article className="kitchen-ticket preparing" key={order.id}>
      <div className="kitchen-ticket-head"><h3>Mesa {table.number}</h3><span className="ticket-id">#{order.id}</span></div>
      <div className="ticket-time"><Icon name="reloj" size={16} /><span>Pedido de muestra · {order.time} h</span></div>
      <ul className="prep-items">{order.items.map((item) => <li key={item.product.id}><span>{item.quantity}</span>{item.product.name}</li>)}</ul>
      {order.note && <div className="kitchen-note"><span>Nota</span><p>{order.note}</p></div>}
      <div className="stack-actions grid gap-2.5">
        {entry.status === "En cocina" && <Action onClick={() => markReady(table)}>Pedido listo <Icon name="check" size={17} /></Action>}
        <button type="button" className="text-button" onClick={() => viewTable(table)}>Ver comanda <Icon name="flecha" size={16} /></button>
      </div>
    </article>;
  }
  return (
    <>
      <div className="page-heading flex items-center justify-between gap-5">
        <Title title="Cocina">{cooking.length} en cocina · {ready.length} listos para servir</Title>
        <span className="quiet-label">
          <Icon name="reloj" size={17} />
          Corte de muestra · 13:10 h
        </span>
      </div>
      <div className="kitchen-board simplified">
        <section className="kitchen-lane">
          <header>
            <h2>
              <i className="dot free" />
              En cocina
            </h2>
            <span className="lane-count">{cooking.length}</span>
          </header>
          <div className="kitchen-queue">
            {cooking.map(ticket)}
          </div>
          {!cooking.length && <div className="kitchen-empty"><Icon name="cocina" size={28} /><h3>Sin pedidos por preparar</h3><p>Los pedidos aparecen cuando caja los confirma.</p></div>}
        </section>
        <section className="kitchen-lane">
          <header>
            <h2>
              <i className="dot occupied" />
              Listos
            </h2>
            <span className="lane-count">{ready.length}</span>
          </header>
          <div className="ready-queue">{ready.map(ticket)}</div>
          {!ready.length && <div className="kitchen-empty">
            <Icon name="cocina" size={28} />
            <h3>Sin pedidos listos</h3>
            <p>Cocina confirma aquí cuando termina un pedido.</p>
          </div>}
        </section>
      </div>
    </>
  );
}
