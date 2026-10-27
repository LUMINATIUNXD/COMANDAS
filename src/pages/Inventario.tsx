import { useState, type FormEvent } from "react";
import Icon from "../components/Icon";
import { Action, Badge, Title } from "../components/UI";
import { stockStatus, type StockItem } from "../data/inventory";
import Dialogo from "../components/Dialogo";

export default function Inventario({ inventory, recordStock }: { inventory: StockItem[]; recordStock: (id: number, quantity: number) => void }) {
  const [search, setSearch] = useState("");
  const [onlyLow, setOnlyLow] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [itemId, setItemId] = useState(inventory[0].id);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const lowStock = inventory.filter((item) => item.quantity < item.minimum);
  const selectedItem = inventory.find((item) => item.id === itemId)!;
  function submitEntry(event: FormEvent) {
    event.preventDefault();
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) return;
    recordStock(itemId, Number(amount));
    setMessage(`Entrada registrada: ${amount} ${selectedItem.unit} de ${selectedItem.name}.`);
    setFormOpen(false);
    setAmount("");
  }
  const visible = inventory.filter((item) => (!onlyLow || item.quantity < item.minimum) && item.name.toLocaleLowerCase("es").includes(search.toLocaleLowerCase("es")));
  const quantity = (value: number) => value.toLocaleString("es-MX", { maximumFractionDigits: 1 });
  return <>
    <div className="page-heading flex items-center justify-between gap-5"><Title title="Inventario">{inventory.length} insumos · {lowStock.length} por reponer</Title><Action onClick={() => setFormOpen(true)}><Icon name="pedido" size={18} />Registrar entrada</Action></div>
    <section className="catalog-sheet" aria-label="Existencias de almacén">
      <div className="panel-toolbar inventory-toolbar">
        <div className="segmented" aria-label="Filtrar inventario"><button type="button" aria-pressed={!onlyLow} onClick={() => setOnlyLow(false)}>Todos</button><button type="button" aria-pressed={onlyLow} onClick={() => setOnlyLow(true)}>Por reponer · {lowStock.length}</button></div>
        <div className="search-field compact"><Icon name="buscar" size={18} /><label className="sr-only" htmlFor="buscar-insumo">Buscar insumo</label><input id="buscar-insumo" type="search" placeholder="Buscar insumo" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
      </div>
      <table className="stock-table"><thead><tr><th>Insumo</th><th className="num">Existencia</th><th className="num">Mínimo</th><th>Estado</th><th>Última entrada</th></tr></thead><tbody>{visible.map((item) => <tr key={item.id}>
        <td><strong>{item.name}</strong><small>{item.category}</small></td>
        <td className="num" data-label="Existencia">{quantity(item.quantity)} <span className="muted">{item.unit}</span></td>
        <td className="num" data-label="Mínimo">{quantity(item.minimum)} <span className="muted">{item.unit}</span></td>
        <td><Badge warm={item.quantity < item.minimum} neutral={item.quantity >= item.minimum}>{stockStatus(item)}</Badge></td>
        <td data-label="Última entrada">{item.updated}</td>
      </tr>)}</tbody></table>
      {!visible.length && <p className="queue-empty" role="status">No se encontraron insumos con estos filtros.</p>}
      <div className="table-foot" aria-live="polite">{visible.length} de {inventory.length} insumos</div>
    </section>
    <p className="demo-caption">Existencias de ejemplo. Las entradas se conservan durante esta prueba.</p>
    <p className="form-feedback" role="status">{message}</p>
    {formOpen && <Dialogo title="Registrar entrada" close={() => setFormOpen(false)}><form className="working-form" onSubmit={submitEntry}>
      <label>Insumo<select value={itemId} onChange={(event) => setItemId(Number(event.target.value))}>{inventory.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <p className="muted">Existencia actual: {quantity(selectedItem.quantity)} {selectedItem.unit}</p>
      <label>Cantidad a ingresar ({selectedItem.unit})<input type="number" min="0.01" max="99999" step={selectedItem.unit === "pzas" || selectedItem.unit === "porciones" ? "1" : "0.01"} required value={amount} onChange={(event) => setAmount(event.target.value)} /></label>
      <footer><button type="button" className="action secondary" onClick={() => setFormOpen(false)}>Cancelar</button><button type="submit" className="action">Guardar entrada</button></footer>
    </form></Dialogo>}
  </>;
}
