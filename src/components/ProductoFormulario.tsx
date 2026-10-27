import { useState, type FormEvent } from "react";
import Dialogo from "./Dialogo";
import type { Product } from "../data/demo";

export default function ProductoFormulario({ product, nextId, save, close }: {
  product: Product | null; nextId: number; save: (product: Product) => void; close: () => void;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.category ?? "Platillos");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [description, setDescription] = useState(product?.description ?? "");
  const [available, setAvailable] = useState(product?.available ?? true);
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !Number.isFinite(Number(price)) || Number(price) <= 0) return;
    save({ id: product?.id ?? nextId, name: name.trim(), category, price: Number(price), description: description.trim(), available });
    close();
  }
  return <Dialogo title={product ? "Editar producto" : "Agregar producto"} close={close}>
    <form className="working-form" onSubmit={submit}>
      <label>Nombre<input value={name} onChange={(event) => setName(event.target.value)} required maxLength={70} /></label>
      <div className="form-columns">
        <label>Categoría<select value={category} onChange={(event) => setCategory(event.target.value)}>{["Platillos", "Bebidas", "Postres"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Precio MXN<input type="number" min="0.01" max="99999" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} required /></label>
      </div>
      <label>Descripción<textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={180} rows={3} /></label>
      <label className="check-field"><input type="checkbox" checked={available} onChange={(event) => setAvailable(event.target.checked)} />Disponible para pedir</label>
      <footer><button type="button" className="action secondary" onClick={close}>Cancelar</button><button type="submit" className="action">Guardar producto</button></footer>
    </form>
  </Dialogo>;
}
