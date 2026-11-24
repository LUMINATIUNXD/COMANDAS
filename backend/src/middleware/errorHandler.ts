import type { ErrorRequestHandler } from "express";

// Este middleware evita que un error cierre el servidor.
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
};
