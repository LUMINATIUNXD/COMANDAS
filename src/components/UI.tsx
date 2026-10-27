import type { ReactNode } from "react";
import { items, money, orderTotal, type OrderItem } from "../data/demo";
export type { Navigate } from "../types/navigation";

export function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={"card min-w-0 rounded-lg p-6 " + className}>
      {children}
    </section>
  );
}
export function Title({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="title-block">
      <h1>{title}</h1>
      {children && <p className="muted">{children}</p>}
    </div>
  );
}
export function Action({
  children,
  onClick,
  secondary = false,
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={"action" + (secondary ? " secondary" : "")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export function Summary({ orderItems = items, changeQuantity }: { orderItems?: OrderItem[]; changeQuantity?: (id: number, quantity: number) => void }) {
  const total = orderTotal(orderItems);
  return (
    <div className="ticket-body">
      <h2>Detalle del pedido</h2>
      <div className="ticket-labels">
        <span>Producto</span>
        <span>Importe</span>
      </div>
      <ul className="ticket-items">
        {orderItems.map((item) => (
          <li key={item.product.id}>
            <span className="item-quantity">{item.quantity}</span>
            <div>
              <strong>{item.product.name}</strong>
              <span>{money(item.product.price)} c/u</span>
              {changeQuantity && <div className="quantity-controls">
                <button type="button" aria-label={"Quitar una unidad de " + item.product.name} onClick={() => changeQuantity(item.product.id, item.quantity - 1)}>−</button>
                <span className="num">{item.quantity}</span>
                <button type="button" aria-label={"Añadir una unidad de " + item.product.name} disabled={item.quantity >= 99} onClick={() => changeQuantity(item.product.id, item.quantity + 1)}>+</button>
              </div>}
            </div>
            <strong className="num">
              {money(item.quantity * item.product.price)}
            </strong>
          </li>
        ))}
      </ul>
      {!orderItems.length && <p className="queue-empty">Agrega un platillo para comenzar.</p>}
      <div className="ticket-total">
        <span>
          Total <small>MXN</small>
        </span>
        <strong className="num">{money(total)}</strong>
      </div>
    </div>
  );
}
export function Badge({
  children,
  warm = false,
  neutral = false,
}: {
  children: ReactNode;
  warm?: boolean;
  neutral?: boolean;
}) {
  return (
    <span
      className={"badge" + (warm ? " warm" : "") + (neutral ? " neutral" : "")}
    >
      {children}
    </span>
  );
}
