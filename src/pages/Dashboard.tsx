import Icon from "../components/Icon";
import { Card, Title } from "../components/UI";
import {
  closedTickets,
  money,
  payments,
  sampleDate,
} from "../data/demo";
import type { StockItem } from "../data/inventory";
import type { Navigate } from "../types/navigation";
const topProducts = [
  { name: "Enchiladas verdes", quantity: 15 },
  { name: "Tacos de pollo", quantity: 13 },
  { name: "Agua de jamaica", quantity: 16 },
];
export default function Dashboard({ go, paymentData = payments, ticketCount = closedTickets, lowStock }: { go: Navigate; paymentData?: typeof payments; ticketCount?: number; lowStock: StockItem[] }) {
  const sales = paymentData.reduce((sum, payment) => sum + payment.amount, 0);
  return (
    <>
      <div className="page-heading flex items-center justify-between gap-5">
        <Title title="Dashboard">Administración · Ventas del día</Title>
        <span className="quiet-label">{sampleDate}</span>
      </div>
      <dl className="metrics-strip grid grid-cols-4">
        <div>
          <dt>Ventas del día</dt>
          <dd className="num">
            {money(sales)}
            <small>MXN</small>
          </dd>
        </div>
        <div>
          <dt>Comandas cerradas</dt>
          <dd className="num">{ticketCount}</dd>
        </div>
        <div>
          <dt>Ticket promedio</dt>
          <dd className="num">
            {money(ticketCount ? sales / ticketCount : 0)}
            <small>MXN</small>
          </dd>
        </div>
        <div>
          <dt>Insumos por reponer</dt>
          <dd className="num">{lowStock.length}</dd>
        </div>
      </dl>
      <div className="dashboard-grid">
        <Card>
          <div className="section-heading">
            <h2>Formas de pago</h2>
            <span className="muted">Importe</span>
          </div>
          <div className="payment-bars">
            {paymentData.map((payment) => (
              <div key={payment.name}>
                <div>
                  <span>{payment.name}</span>
                  <strong className="num">{money(payment.amount)}</strong>
                </div>
                <div className="bar-track">
                  <span
                    style={{ width: (sales ? payment.amount / sales : 0) * 100 + "%" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="list-total">
            <span>Total vendido</span>
            <strong className="num">{money(sales)}</strong>
          </div>
        </Card>
        <Card>
          <div className="section-heading">
            <h2>Lo más pedido</h2>
            <span className="muted">Unidades</span>
          </div>
          <ol className="ranking-list">
            {[...topProducts]
              .sort((a, b) => b.quantity - a.quantity)
              .map((product, index) => (
                <li key={product.name}>
                  <span className="rank num">{index + 1}</span>
                  <span>{product.name}</span>
                  <strong className="num">{product.quantity}</strong>
                </li>
              ))}
          </ol>
        </Card>
        <Card className="service-summary">
          <div>
            <h2>Atención en almacén</h2>
            <p className="muted">{lowStock.map((item) => item.name).join(" · ")}</p>
          </div>
          <button
            className="text-button"
            type="button"
            onClick={() => go("inventario")}
          >
            Revisar inventario <Icon name="flecha" size={17} />
          </button>
        </Card>
      </div>
    </>
  );
}
