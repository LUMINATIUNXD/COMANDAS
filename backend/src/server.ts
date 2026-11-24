import express from "express";
import cors from "cors";
import "dotenv/config";
import { productRoutes } from "./routes/productRoutes.js";
import { comandaRoutes } from "./routes/comandaRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { pool } from "./config/database.js";

const app = express(); const port = Number(process.env.PORT ?? 3000);
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:5173" }));
app.use(express.json());
app.get("/api/health", async (_req, res) => { await pool.query("SELECT 1"); res.json({ ok: true, message: "API conectada a MySQL" }); });
app.use("/api", productRoutes); app.use("/api/comandas", comandaRoutes); app.use(errorHandler);
app.listen(port, () => console.log("Point Zero API disponible en http://localhost:" + port));
