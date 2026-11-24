import { pool } from "../config/database.js";

export async function findProducts() {
  const [rows] = await pool.query("SELECT Id_producto id, Nombre nombre, Categoria categoria, Precio precio, Disponible disponible FROM Producto ORDER BY Id_producto");
  return rows;
}

export async function findInventory() {
  const [rows] = await pool.query(
    "SELECT i.Id_inventario id_inventario, i.Id_producto id_producto, p.Nombre nombre, i.Stock stock, p.Disponible disponible FROM Inventario i INNER JOIN Producto p ON p.Id_producto = i.Id_producto ORDER BY p.Nombre",
  );
  return rows;
}

export async function updateStock(idProducto: number, stock: number) {
  const [result] = await pool.query("UPDATE Inventario SET Stock = ? WHERE Id_producto = ?", [stock, idProducto]);
  return result;
}

export async function insertProduct(data: { nombre: string; categoria: string; precio: number; disponible: boolean }) {
  const [result] = await pool.query(
    "INSERT INTO Producto (Nombre, Categoria, Precio, Disponible) VALUES (?, ?, ?, ?)",
    [data.nombre, data.categoria, data.precio, data.disponible ? 1 : 0],
  );
  return result;
}

export async function editProduct(id: number, data: { nombre: string; categoria: string; precio: number; disponible: boolean }) {
  const [result] = await pool.query(
    "UPDATE Producto SET Nombre = ?, Categoria = ?, Precio = ?, Disponible = ? WHERE Id_producto = ?",
    [data.nombre, data.categoria, data.precio, data.disponible ? 1 : 0, id],
  );
  return result;
}
