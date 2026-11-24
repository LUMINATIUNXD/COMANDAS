import { Router } from "express";
import { getInventory, getProducts, patchStock, postProduct, putProduct } from "../controllers/productController.js";
export const productRoutes = Router();
productRoutes.get("/productos", getProducts);
productRoutes.get("/inventario", getInventory);
productRoutes.patch("/inventario/:id/stock", patchStock);
productRoutes.post("/productos", postProduct);
productRoutes.put("/productos/:id", putProduct);
