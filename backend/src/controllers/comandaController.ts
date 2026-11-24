import type { Request, Response } from "express";
import { changeStatus, createComanda, listComandas } from "../repositories/comandaRepository.js";
import type { CrearComanda, EstadoComanda } from "../types/models.js";

const estados: EstadoComanda[] = ["por_confirmar", "en_cocina", "lista", "entregada", "por_cobrar", "pagada"];
export async function getComandas(_req: Request, res: Response) { res.json(await listComandas()); }

export async function postComanda(req: Request, res: Response) {
  const data = req.body as CrearComanda;
  if (!Number.isInteger(data.num_mesa) || data.num_mesa < 1 || data.num_mesa > 99) return res.status(400).json({ error: "La mesa debe ser un número válido." });
  if (!["mesero", "app"].includes(data.origen) || !Array.isArray(data.items) || data.items.length === 0) return res.status(400).json({ error: "La comanda necesita origen e items." });
  if (data.items.some((item) => !Number.isInteger(item.id_producto) || !Number.isInteger(item.cantidad) || item.cantidad < 1)) return res.status(400).json({ error: "Cada producto debe tener una cantidad positiva." });
  try {
    return res.status(201).json(await createComanda(data));
  } catch (error) {
    const status = (error as { status?: number }).status ?? 500;
    const message = error instanceof Error ? error.message : "No se pudo guardar la comanda.";
    return res.status(status).json({ error: message });
  }
}

export async function patchComandaStatus(req: Request, res: Response) {
  const id = Number(req.params.id); const estado = req.body.estado as EstadoComanda;
  if (!Number.isInteger(id) || !estados.includes(estado)) return res.status(400).json({ error: "ID o estado no válido." });
  const [result] = await changeStatus(id, estado);
  if ((result as { affectedRows: number }).affectedRows === 0) return res.status(404).json({ error: "Comanda no encontrada." });
  return res.json({ message: "Estado actualizado." });
}
