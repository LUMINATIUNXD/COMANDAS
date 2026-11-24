import { pool } from "../config/database.js";
import type { CrearComanda, EstadoComanda } from "../types/models.js";

export async function listComandas() {
  const [rows] = await pool.query("SELECT Id_comanda id, Num_mesa mesa, Fecha fecha, Hora hora, Origen origen, Estado_comanda estado FROM Comanda ORDER BY Id_comanda DESC");
  return rows;
}

export async function createComanda(data: CrearComanda) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [comandaResult] = await connection.execute(
      "INSERT INTO Comanda (Id_usuario, Id_cliente, Num_mesa, Fecha, Hora, Origen) VALUES (?, ?, ?, CURDATE(), CURTIME(), ?)",
      [data.id_usuario ?? null, data.id_cliente ?? null, data.num_mesa, data.origen],
    );
    const idComanda = Number((comandaResult as { insertId: number }).insertId);
    const [pedidoResult] = await connection.execute("INSERT INTO Pedido (Id_comanda, Estado_pedido) VALUES (?, 'en_cocina')", [idComanda]);
    const idPedido = Number((pedidoResult as { insertId: number }).insertId);

    for (const item of data.items) {
      const [productRows] = await connection.execute(
        "SELECT p.Precio precio, p.Disponible disponible, i.Stock stock FROM Producto p INNER JOIN Inventario i ON i.Id_producto = p.Id_producto WHERE p.Id_producto = ? FOR UPDATE",
        [item.id_producto],
      );
      const products = productRows as Array<{ precio: number; disponible: number; stock: number }>;
      if (products.length === 0) throw Object.assign(new Error("Producto inexistente"), { status: 404 });
      const product = products[0];
      if (!product.disponible || product.stock < item.cantidad) {
        throw Object.assign(new Error("Producto no disponible o sin existencias suficientes"), { status: 409 });
      }
      const subtotal = Number(product.precio) * item.cantidad;
      await connection.execute("INSERT INTO Item_pedido (Id_pedido, Id_producto, Cantidad, Precio_unitario, Subtotal) VALUES (?, ?, ?, ?, ?)", [idPedido, item.id_producto, item.cantidad, product.precio, subtotal]);
      await connection.execute("UPDATE Inventario SET Stock = Stock - ? WHERE Id_producto = ?", [item.cantidad, item.id_producto]);
    }
    await connection.commit();
    return { id: idComanda, id_pedido: idPedido };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function changeStatus(id: number, estado: EstadoComanda) {
  return pool.execute("UPDATE Comanda SET Estado_comanda = ? WHERE Id_comanda = ?", [estado, id]);
}
