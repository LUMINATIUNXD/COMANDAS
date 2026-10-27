import { useState } from "react";
import Icon from "../components/Icon";
import { Action, Badge, Title } from "../components/UI";
import { money, type Product } from "../data/demo";
import ProductoFormulario from "../components/ProductoFormulario";
export default function Productos({ products, saveProduct }: { products: Product[]; saveProduct: (product: Product) => void }) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null | undefined>();
  const [message, setMessage] = useState("");
  const visible = products.filter((product) =>
    product.name
      .toLocaleLowerCase("es")
      .includes(search.toLocaleLowerCase("es")),
  );
  return (
    <>
      <div className="page-heading flex items-center justify-between gap-5">
        <Title title="Productos">Catálogo del restaurante</Title>
        <Action onClick={() => setEditing(null)}>
          <Icon name="pedido" size={18} />
          Agregar producto
        </Action>
      </div>
      <section className="catalog-sheet" aria-label="Lista de productos">
        <div className="panel-toolbar">
          <span>
            {products.length} productos ·{" "}
            {products.filter((p) => p.available).length} disponibles
          </span>
          <div className="search-field compact">
            <Icon name="buscar" size={18} />
            <label className="sr-only" htmlFor="buscar-productos">
              Buscar producto
            </label>
            <input
              id="buscar-productos"
              type="search"
              value={search}
              placeholder="Buscar producto"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th className="num">Precio MXN</th>
              <th>Estado</th>
              <th>
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((product) => (
              <tr key={product.id}>
                <td>
                  <strong>{product.name}</strong>
                  <small>{product.description}</small>
                </td>
                <td data-label="Categoría">{product.category}</td>
                <td className="num" data-label="Precio MXN">
                  <strong>{money(product.price)}</strong>
                </td>
                <td data-label="Estado">
                  <Badge warm={!product.available}>
                    {product.available ? "Disponible" : "Agotado"}
                  </Badge>
                </td>
                <td>
                  <button
                    className="table-action"
                    type="button"
                    onClick={() => setEditing(product)}
                    aria-label={"Editar " + product.name}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="empty-state" role="status">
            No se encontraron productos con ese nombre.
          </p>
        )}
        <div className="table-foot" aria-live="polite">
          {visible.length} de {products.length} productos
        </div>
      </section>
      <p className="demo-caption">
        Cambios locales de muestra. Al recargar se restaura el catálogo inicial.
      </p>
      <p className="form-feedback" role="status">{message}</p>
      {editing !== undefined && <ProductoFormulario product={editing} nextId={Math.max(...products.map((product) => product.id)) + 1} close={() => setEditing(undefined)} save={(product) => { saveProduct(product); setMessage(product.name + " guardado."); }} />}
    </>
  );
}
