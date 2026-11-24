import type { Product } from "./demo";
import type { StockItem } from "./inventory";

const API_URL = "http://localhost:3000/api";

type ApiProduct = { id: number; nombre: string; categoria: string; precio: number | string; disponible: number };
type ApiInventory = { id_producto: number; nombre: string; stock: number; disponible: number };

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(API_URL + path, options);
  const body = await response.json();
  if (!response.ok) throw new Error(body.error ?? "La API devolvió un error.");
  return body as T;
}

// Convierte el producto de MySQL al formato que ya usa la interfaz original.
export async function getProductsFromApi(): Promise<Product[]> {
  const rows = await request<ApiProduct[]>("/productos");
  return rows.map((item) => ({
    id: item.id,
    name: item.nombre,
    category: item.categoria,
    price: Number(item.precio),
    description: "Producto del catálogo de Point Zero.",
    available: Boolean(item.disponible),
  }));
}

// Convierte el inventario de MySQL al formato que muestra la pantalla web.
export async function getInventoryFromApi(): Promise<StockItem[]> {
  const rows = await request<ApiInventory[]>("/inventario");
  return rows.map((item) => ({
    id: item.id_producto,
    name: item.nombre,
    category: "Productos",
    quantity: Number(item.stock),
    minimum: 5,
    unit: "pzas",
    updated: "Actualizado desde MySQL",
  }));
}

export async function saveComanda(numMesa: number, items: Array<{ product: Product; quantity: number }>) {
  return request<{ id: number; id_pedido: number }>("/comandas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      num_mesa: numMesa,
      origen: "mesero",
      items: items.map((item) => ({ id_producto: item.product.id, cantidad: item.quantity })),
    }),
  });
}

export async function updateStockInApi(id: number, stock: number) {
  return request<{ message: string }>("/inventario/" + id + "/stock", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock }),
  });
}

export async function saveProductInApi(product: Product, existing: boolean) {
  const body = {
    nombre: product.name,
    categoria: product.category,
    precio: product.price,
    disponible: product.available,
  };
  return request<{ id?: number; message?: string }>(
    existing ? "/productos/" + product.id : "/productos",
    {
      method: existing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export async function updateComandaStatus(id: number, estado: string) {
  return request<{ message: string }>("/comandas/" + id + "/estado", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });
}
