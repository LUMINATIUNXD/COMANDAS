export const inventory = [
  { id: 1, name: "Pollo", category: "Ingredientes", quantity: 2.4, minimum: 3, unit: "kg", updated: "12:45 h" },
  { id: 2, name: "Salsa verde", category: "Ingredientes", quantity: 5, minimum: 2, unit: "L", updated: "12:30 h" },
  { id: 3, name: "Tortilla de maíz", category: "Ingredientes", quantity: 40, minimum: 60, unit: "pzas", updated: "12:45 h" },
  { id: 4, name: "Agua de jamaica", category: "Bebidas", quantity: 8, minimum: 3, unit: "L", updated: "13:00 h" },
  { id: 5, name: "Flan de la casa", category: "Postres", quantity: 0, minimum: 4, unit: "porciones", updated: "12:50 h" },
];
export type StockItem = (typeof inventory)[number];
export const stockStatus = (item: StockItem) =>
  item.quantity === 0 ? "Agotado" : item.quantity < item.minimum ? "Bajo mínimo" : "Disponible";
export const lowStock = inventory.filter((item) => item.quantity < item.minimum);
