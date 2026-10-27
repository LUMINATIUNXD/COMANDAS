import { useState } from "react";
import Icon from "../components/Icon";
import { Action, Card, Summary, Title } from "../components/UI";
import {
  money,
  type Product,
  orderTotal,
  type RestaurantTable,
} from "../data/demo";
import type { Navigate } from "../types/navigation";
import type { OrderDraft } from "../data/service";
const categories = ["Todos", "Platillos", "Bebidas", "Postres"];

export default function NuevaComanda({
  go,
  table,
  sendOrder,
  products,
  draft,
  changeDraft,
  orderId,
}: {
  go: Navigate;
  table: RestaurantTable;
  sendOrder: () => void;
  products: Product[];
  draft: OrderDraft;
  changeDraft: (draft: OrderDraft) => void;
  orderId: string;
}) {
  const order = { ...draft, id: orderId };
  const total = orderTotal(order.items);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  function addProduct(product: Product) {
    if (!product.available) return;
    const existing = draft.items.find((item) => item.product.id === product.id);
    changeDraft({ ...draft, items: existing
      ? draft.items.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item)
      : [...draft.items, { product, quantity: 1 }] });
  }
  function changeQuantity(id: number, quantity: number) {
    changeDraft({ ...draft, items: draft.items.map((item) => item.product.id === id ? { ...item, quantity: Math.max(0, Math.min(99, quantity)) } : item).filter((item) => item.quantity > 0) });
  }
  const visible = products.filter(
    (product) =>
      (category === "Todos" || product.category === category) &&
      product.name
        .toLocaleLowerCase("es")
        .includes(search.toLocaleLowerCase("es")),
  );
  return (
    <>
      <div className="page-heading flex items-center justify-between gap-5">
        <Title title="Tomar pedido">
          Mesa {table.number} · {table.seats} personas
        </Title>
        <span className="ticket-id">Comanda #{order.id}</span>
        <a className="mobile-order-link" href="#resumen-pedido">
          Ver pedido · {money(total)} <Icon name="flecha" size={17} />
        </a>
      </div>
      <div className="order-layout">
        <section className="catalog" aria-label="Catálogo de platillos">
          <label className="sr-only" htmlFor="buscar">
            Buscar platillo
          </label>
          <div className="search-field">
            <Icon name="buscar" size={20} />
            <input
              id="buscar"
              type="search"
              placeholder="Buscar platillo o bebida"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="category-tabs" aria-label="Categorías">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div
            className="product-tiles grid grid-cols-2 items-start gap-4"
            aria-live="polite"
          >
            {visible.map((product) => (
              <article
                className={
                  "product-tile" + (!product.available ? " sold-out" : "")
                }
                key={product.id}
              >
                <div className="product-meta">
                  <span>{product.category}</span>
                </div>
                <h2>{product.name}</h2>
                <p className="muted">{product.description}</p>
                <div className="product-bottom">
                  <strong className="num">{money(product.price)}</strong>
                  <button
                    className="add-product"
                    type="button"
                    disabled={!product.available || table.state !== "Libre"}
                    onClick={() => addProduct(product)}
                    aria-label={"Agregar " + product.name}
                  >
                    {product.available ? (
                      <>
                        <Icon name="pedido" size={18} />
                        Agregar
                      </>
                    ) : (
                      "Agotado"
                    )}
                  </button>
                </div>
              </article>
            ))}
            {visible.length === 0 && (
              <div className="empty-state">
                <h2>Sin resultados</h2>
                <p>Prueba con otro nombre o categoría.</p>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => {
                    setSearch("");
                    setCategory("Todos");
                  }}
                >
                  Ver todos los productos <Icon name="flecha" size={16} />
                </button>
              </div>
            )}
          </div>
          <p className="demo-caption">
            Los cambios se conservan durante esta prueba.
          </p>
        </section>
        <Card className="order-summary" id="resumen-pedido">
          <div className="order-summary-heading">
            <span>Mesa {table.number}</span>
            <span className="ticket-id">#{order.id}</span>
          </div>
          <Summary orderItems={order.items} changeQuantity={changeQuantity} />
          <label htmlFor="nota">Nota para cocina</label>
          <textarea id="nota" value={order.note} onChange={(event) => changeDraft({ ...draft, note: event.target.value })} maxLength={250} placeholder="Ej. sin cebolla" rows={2} />
          <div className="stack-actions grid gap-2.5">
            <Action onClick={sendOrder} disabled={table.state !== "Libre" || !draft.items.length}>
              {table.state === "Libre" ? "Enviar a caja" : "Esta mesa ya tiene un pedido"} <Icon name="flecha" size={18} />
            </Action>
            <Action secondary onClick={() => go("mesas")}>
              Volver a mesas
            </Action>
          </div>
          <p className="demo-caption">Caja confirma el pedido antes de enviarlo a cocina.</p>
        </Card>
      </div>
    </>
  );
}
