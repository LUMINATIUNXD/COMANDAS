import type { Request, Response } from "express";
import { editProduct, findInventory, findProducts, insertProduct, updateStock } from "../repositories/productRepository.js";

export async function getProducts(_req: Request, res: Response) { res.json(await findProducts()); }
export async function getInventory(_req: Request, res: Response) { res.json(await findInventory()); }

export async function patchStock(req: Request, res: Response) {
  const id = Number(req.params.id); const stock = Number(req.body.stock);
  if (!Number.isInteger(id) || !Number.isInteger(stock) || stock < 0) return res.status(400).json({ error: "El ID y el stock deben ser números válidos." });
  const result = await updateStock(id, stock);
  if ((result as { affectedRows: number }).affectedRows === 0) return res.status(404).json({ error: "Producto de inventario no encontrado." });
  return res.json({ message: "Existencia actualizada." });
}

function readProduct(body: unknown) {
  const data = body as { nombre?: string; categoria?: string; precio?: number; disponible?: boolean };
  if (!data.nombre?.trim() || !data.categoria?.trim() || !Number.isFinite(Number(data.precio))) return null;
  return { nombre: data.nombre.trim(), categoria: data.categoria.trim(), precio: Number(data.precio), disponible: Boolean(data.disponible) };
}

export async function postProduct(req: Request, res: Response) {
  const data = readProduct(req.body);
  if (!data || data.precio < 0) return res.status(400).json({ error: "Nombre, categoría y precio son obligatorios." });
  const result = await insertProduct(data);
  return res.status(201).json({ id: (result as { insertId: number }).insertId });
}

export async function putProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data = readProduct(req.body);
  if (!Number.isInteger(id) || !data || data.precio < 0) return res.status(400).json({ error: "Datos del producto no válidos." });
  const result = await editProduct(id, data);
  if ((result as { affectedRows: number }).affectedRows === 0) return res.status(404).json({ error: "Producto no encontrado." });
  return res.json({ message: "Producto actualizado." });
}
