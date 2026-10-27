import Icon from "../components/Icon";
import { useState } from "react";
import type { PaymentMethod } from "../data/service";
import { Action, Card, Summary, Title } from "../components/UI";
import {
  money,
  type DemoOrder,
  orderTotal,
  type RestaurantTable,
} from "../data/demo";
import type { Navigate } from "../types/navigation";
export default function Cierre({
  go,
  table,
  payOrder,
  order,
}: {
  go: Navigate;
  table: RestaurantTable;
  payOrder: (method: PaymentMethod) => void;
  order: DemoOrder;
}) {
  const total = orderTotal(order.items);
  const [method, setMethod] = useState<PaymentMethod>("Efectivo");
  return (
    <>
      <div className="page-heading flex items-center justify-between gap-5">
        <Title title="Cobrar cuenta">
          Comanda #{order.id} · Mesa {table.number}
        </Title>
      </div>
      <div className="detail-layout">
        <Card>
          <div className="order-summary-heading">
            <span>Mesa {table.number}</span>
            <span className="ticket-id">#{order.id}</span>
          </div>
          <Summary orderItems={order.items} />
        </Card>
        <section className="close-panel">
          <span className="muted">Total de la cuenta</span>
          <p className="close-amount num">
            {money(total)} <small>MXN</small>
          </p>
          <div className="close-rule" />
          <fieldset className="payment-choice">
            <legend>Forma de pago</legend>
            {(["Efectivo", "Tarjeta", "Transferencia"] as const).map((item) => <label key={item}>
              <input type="radio" name="pago" value={item} checked={method === item} onChange={() => setMethod(item)} />
              {item}
            </label>)}
          </fieldset>
          <div className="stack-actions grid gap-2.5">
            <Action onClick={() => payOrder(method)}>
              Confirmar cobro de muestra <Icon name="check" size={19} />
            </Action>
            <Action secondary onClick={() => go("detalle")}>
              Volver a la comanda
            </Action>
          </div>
          <p className="demo-caption">
            Simulación visual. No se realiza ningún cobro.
          </p>
        </section>
      </div>
    </>
  );
}
