import Icon from "./Icon";
import { Badge } from "./UI";
import { money, orderTotal, type RestaurantTable } from "../data/demo";
import type { ServiceOrder } from "../data/service";

export default function ListaPedidos({ orders, openOrder, empty, showAmount = false }: {
  orders: ServiceOrder[];
  openOrder: (table: RestaurantTable) => void;
  empty: string;
  showAmount?: boolean;
}) {
  if (!orders.length) return <p className="queue-empty" role="status">{empty}</p>;
  return <ul className="service-orders">
    {orders.map((entry) => {
      const order = entry.details;
      const quantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
      return <li key={order.id}>
        <div className="order-identity">
          <strong>Mesa {entry.table.number}</strong>
          <span>#{order.id} · {quantity} {quantity === 1 ? "producto" : "productos"} · {order.time} h</span>
        </div>
        <Badge warm={entry.status === "Por confirmar" || entry.status === "Por cobrar"} neutral={entry.status === "En cocina"}>{entry.status}</Badge>
        {showAmount && <strong className="num order-amount">{money(orderTotal(order.items))}</strong>}
        <button type="button" className="text-button" onClick={() => openOrder(entry.table)} aria-label={`Revisar pedido de mesa ${entry.table.number}`}>
          Revisar <Icon name="flecha" size={16} />
        </button>
      </li>;
    })}
  </ul>;
}
