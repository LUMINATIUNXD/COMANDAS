export const products = [
  {
    id: 1,
    name: "Enchiladas verdes",
    category: "Platillos",
    price: 110,
    description: "Pollo, salsa verde, crema y queso fresco.",
    available: true,
  },
  {
    id: 2,
    name: "Tacos de pollo",
    category: "Platillos",
    price: 85,
    description: "Tres tacos con guarnición de la casa.",
    available: true,
  },
  {
    id: 3,
    name: "Agua de jamaica",
    category: "Bebidas",
    price: 35,
    description: "Agua fresca de jamaica. Vaso de 500 ml.",
    available: true,
  },
  {
    id: 4,
    name: "Flan de la casa",
    category: "Postres",
    price: 55,
    description: "Flan de vainilla con caramelo.",
    available: false,
  },
];
export type Product = (typeof products)[number];
export const items = [
  { product: products[0], quantity: 2 },
  { product: products[2], quantity: 2 },
];
export const total = items.reduce(
  (sum, item) => sum + item.product.price * item.quantity,
  0,
);
export const money = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
export const tables = [
  { number: "01", state: "Ocupada", detail: "Comanda #021", seats: 4 },
  { number: "02", state: "Ocupada", detail: "Comanda #025", seats: 4 },
  { number: "03", state: "Libre", detail: "4 lugares", seats: 4 },
  { number: "04", state: "Libre", detail: "2 lugares", seats: 2 },
  { number: "05", state: "Por cerrar", detail: "Comanda #023", seats: 4 },
  { number: "06", state: "Libre", detail: "4 lugares", seats: 4 },
];
export const payments = [
  { name: "Efectivo", amount: 1480 },
  { name: "Tarjeta", amount: 1700 },
  { name: "Transferencia", amount: 300 },
];
export const daySales = payments.reduce(
  (sum, payment) => sum + payment.amount,
  0,
);
export const closedTickets = 12;
export const sampleDate = "24 de octubre de 2026";

export type RestaurantTable = (typeof tables)[number];
export type OrderItem = (typeof items)[number];
export type DemoOrder = {
  id: string;
  time: string;
  elapsed: number;
  items: OrderItem[];
  note: string;
  state: "En cocina" | "Listo";
};
const sampleOrders: Record<string, DemoOrder> = {
  "01": {
    id: "021",
    time: "12:50",
    elapsed: 20,
    items: [
      { product: products[0], quantity: 2 },
      { product: products[2], quantity: 1 },
    ],
    note: "",
    state: "Listo",
  },
  "02": {
    id: "025",
    time: "13:08",
    elapsed: 2,
    items: [{ product: products[1], quantity: 1 }],
    note: "",
    state: "En cocina",
  },
  "03": {
    id: "024",
    time: "13:05",
    elapsed: 5,
    items,
    note: "Sin cebolla",
    state: "En cocina",
  },
  "04": {
    id: "026",
    time: "13:10",
    elapsed: 0,
    items,
    note: "Sin cebolla",
    state: "En cocina",
  },
  "05": {
    id: "023",
    time: "12:55",
    elapsed: 15,
    items: [
      { product: products[1], quantity: 2 },
      { product: products[2], quantity: 2 },
    ],
    note: "",
    state: "Listo",
  },
  "06": {
    id: "027",
    time: "13:10",
    elapsed: 0,
    items,
    note: "Sin cebolla",
    state: "En cocina",
  },
};
export const orderForTable = (table: RestaurantTable) =>
  sampleOrders[table.number];
export const orderTotal = (orderItems: OrderItem[]) =>
  orderItems.reduce((sum, item) => sum + Math.round(item.product.price * 100) * item.quantity, 0) / 100;
