import { Router } from "express";
import { getComandas, patchComandaStatus, postComanda } from "../controllers/comandaController.js";
export const comandaRoutes = Router();
comandaRoutes.get("/", getComandas);
comandaRoutes.post("/", postComanda);
comandaRoutes.patch("/:id/estado", patchComandaStatus);
