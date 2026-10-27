import { useState } from "react";
import Icon from "../components/Icon";
import { Action, Badge, Title } from "../components/UI";
import { type RestaurantTable } from "../data/demo";
import type { ServiceOrder } from "../data/service";
import type { Navigate } from "../types/navigation";
const filters = ["Todas", "Libres", "Ocupadas"] as const;
type Filter = (typeof filters)[number];
const matchesFilter = (table: RestaurantTable, filter: Filter) =>
  filter === "Todas" ||
  (filter === "Libres" ? table.state === "Libre" : table.state !== "Libre");

export default function Mesas({
  go,
  selectedTable,
  selectTable,
  tables,
  orders,
}: {
  go: Navigate;
  selectedTable: RestaurantTable;
  selectTable: (table: RestaurantTable) => void;
  tables: RestaurantTable[];
  orders: ServiceOrder[];
}) {
  const [filter, setFilter] = useState<Filter>("Todas");
  const visible = tables.filter((table) => matchesFilter(table, filter));
  const actionLabel =
    selectedTable.state === "Libre"
      ? "Tomar pedido"
      : "Ver comanda";
  function openTable() {
    go(
      selectedTable.state === "Libre"
        ? "nueva"
        : "detalle",
    );
  }
  function changeFilter(next: Filter) {
    setFilter(next);
    if (!matchesFilter(selectedTable, next)) {
      const first = tables.find((table) => matchesFilter(table, next));
      if (first) selectTable(first);
    }
  }
  return (
    <>
      <div className="page-heading flex items-center justify-between gap-5">
        <Title title="Mesas">Salón principal</Title>
        <div className="room-counts">
          <span>
            <i className="dot free" />
            {tables.filter((table) => table.state === "Libre").length} libres
          </span>
          <span>
            <i className="dot occupied" />
            {tables.filter((table) => table.state === "Ocupada").length}{" "}
            ocupadas
          </span>
          <span>
            <i className="dot closing" />
            {tables.filter((table) => table.state === "Por cerrar").length} por
            cerrar
          </span>
        </div>
        <div className="phone-action">
          <Action onClick={openTable}>
            {actionLabel} · Mesa {selectedTable.number}
            <Icon name="flecha" size={18} />
          </Action>
        </div>
      </div>
      <div className="floor-layout">
        <section className="floor-panel" aria-labelledby="floor-title">
          <header className="panel-toolbar">
            <h2 id="floor-title">
              Comedor <span className="muted">/ {tables.length} mesas</span>
            </h2>
            <div className="segmented" aria-label="Filtrar mesas">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={filter === item}
                  onClick={() => changeFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </header>
          <div className="floor-board">
            {visible.map((table) => {
              const selected = table.number === selectedTable.number;
              const className =
                "floor-table " +
                (table.state === "Libre"
                  ? "free"
                  : table.state === "Ocupada"
                    ? "occupied"
                    : "closing") +
                (selected ? " selected" : "");
              return (
                <button
                  key={table.number}
                  type="button"
                  className={className}
                  onClick={() => selectTable(table)}
                  aria-pressed={selected}
                  aria-label={
                    "Mesa " +
                    table.number +
                    ", " +
                    table.state.toLocaleLowerCase("es")
                  }
                >
                  <span className="table-furniture" aria-hidden="true">
                    <span>{table.number}</span>
                  </span>
                  <strong>Mesa {table.number}</strong>
                  <span className="table-status">
                    <i className="dot" />
                    {table.state}
                  </span>
                  <small>
                    {table.detail}
                    {selected ? " · seleccionada" : ""}
                  </small>
                </button>
              );
            })}
          </div>
          <div className="floor-caption">
            <span>
              {visible.length} de {tables.length} mesas
            </span>
            <span>
              Entrada al salón <Icon name="atras" size={15} />
            </span>
          </div>
        </section>
        <aside className="table-rail" aria-label="Mesa seleccionada">
          <section className="selection-card">
            <div className="section-heading">
              <span className="muted">Mesa seleccionada</span>
              <Badge
                warm={selectedTable.state === "Por cerrar"}
                neutral={selectedTable.state === "Ocupada"}
              >
                {selectedTable.state}
              </Badge>
            </div>
            <h2 aria-live="polite" aria-atomic="true">
              Mesa <span className="num">{selectedTable.number}</span>
            </h2>
            <dl className="key-values">
              <div>
                <dt>Capacidad</dt>
                <dd>{selectedTable.seats} personas</dd>
              </div>
              <div>
                <dt>Área</dt>
                <dd>Comedor</dd>
              </div>
              <div>
                <dt>Atiende</dt>
                <dd>Ana · 07</dd>
              </div>
            </dl>
            <Action onClick={openTable}>
              {actionLabel}
              <Icon name="flecha" size={18} />
            </Action>
          </section>
          <section className="shift-note">
            <h2>Mis pedidos</h2>
            <div>
              <strong className="num">{orders.length}</strong>
              <p>
                pedidos activos
                <br />
                <button
                  className="text-button"
                  type="button"
                  onClick={() => go("pedidos")}
                >
                  Ver pedidos <Icon name="flecha" size={16} />
                </button>
              </p>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
