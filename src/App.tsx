import { useEffect, useRef, useState, type ReactNode } from "react";
import AppLayout from "./components/AppLayout";
import Acceso from "./pages/Acceso";
import Dashboard from "./pages/Dashboard";
import DashboardMesero from "./pages/DashboardMesero";
import PedidosMesero from "./pages/PedidosMesero";
import Caja from "./pages/Caja";
import Inventario from "./pages/Inventario";
import Mesas from "./pages/Mesas";
import NuevaComanda from "./pages/NuevaComanda";
import Detalle from "./pages/Detalle";
import Cocina from "./pages/Cocina";
import Cierre from "./pages/Cierre";
import Productos from "./pages/Productos";
import MenuCliente from "./pages/MenuCliente";
import { tables, products, orderTotal, payments, closedTickets, type RestaurantTable, type Product, type DemoOrder } from "./data/demo";
import { canVisit, type DemoAccount } from "./data/access";
import { initialServiceOrders, serviceStatus, tableForService, type ServiceOrder, type OrderStatus, type PaymentMethod, type OrderDraft } from "./data/service";
import { inventory, type StockItem } from "./data/inventory";
import type { Page } from "./types/navigation";
const pageTitles: Record<Page, string> = {
  acceso: "Acceso",
  "inicio-mesero": "Mi turno", pedidos: "Mis pedidos", caja: "Caja", inventario: "Inventario",
  resumen: "Dashboard",
  mesas: "Mesas",
  nueva: "Nueva comanda",
  detalle: "Comanda",
  cocina: "Cocina",
  cierre: "Cobrar cuenta",
  productos: "Productos",
  menu: "Menú",
};
export default function App() {
  const [page, setPage] = useState<Page>("acceso");
  const [account, setAccount] = useState<DemoAccount | null>(null);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable>(
    tables[2],
  );
  const [orders, setOrders] = useState<ServiceOrder[]>(initialServiceOrders);
  const [catalog, setCatalog] = useState<Product[]>(products);
  const [stock, setStock] = useState<StockItem[]>(inventory);
  const [drafts, setDrafts] = useState<Record<string, OrderDraft>>({});
  const [reviews, setReviews] = useState([{ id: 1, rating: 5, comment: "Buena comida y atención." }]);
  const menuOrigin = useRef<Page>("acceso");
  const liveTables = tables.map((table) => tableForService(table, orders));
  const currentTable = liveTables.find((table) => table.number === selectedTable.number)!;
  const status = serviceStatus(orders, currentTable);
  const draft = drafts[currentTable.number] ?? { items: [], note: "" };
  const nextId = String(Math.max(25, ...orders.map((order) => Number(order.details.id))) + 1).padStart(3, "0");
  const currentOrder: DemoOrder = orders.find((order) => order.table.number === currentTable.number && order.status !== "Pagado")?.details ?? {
    id: nextId, time: "13:10", elapsed: 0, items: draft.items, note: draft.note, state: "En cocina",
  };
  const myOrders = orders.filter((order) => order.waiterId === account?.staffId && order.status !== "Pagado");
  const paidOrders = orders.filter((order) => order.status === "Pagado");
  const currentPayments = payments.map((payment) => ({
    ...payment,
    amount: payment.amount + paidOrders.filter((order) => order.payment === payment.name)
      .reduce((sum, order) => sum + orderTotal(order.details.items), 0),
  }));
  function login(next: DemoAccount) {
    setAccount(next);
    setPage(next.home);
  }
  function logout() {
    setAccount(null);
    menuOrigin.current = "acceso";
    setPage("acceso");
  }
  function go(next: Page) {
    if (next === "acceso") { logout(); return; }
    if (next === "menu" && (!account || canVisit(account, next))) {
      menuOrigin.current = page;
      setPage(next);
      return;
    }
    if (account && canVisit(account, next)) {
      if (next === "nueva" && currentTable.state !== "Libre") {
        const free = liveTables.find((table) => table.state === "Libre");
        if (!free) { setPage("mesas"); return; }
        setSelectedTable(free);
      }
      setPage(next);
    }
  }
  function openOrder(table: RestaurantTable) {
    if (!account || !canVisit(account, "detalle")) return;
    setSelectedTable(table);
    setPage("detalle");
  }
  function sendOrder() {
    if (account?.role !== "mesero" || currentTable.state !== "Libre" || !draft.items.length) return;
    setOrders((previous) => [
      ...previous,
      { table: currentTable, status: "Por confirmar", waiterId: account.staffId, details: currentOrder },
    ]);
    setDrafts((previous) => { const next = { ...previous }; delete next[currentTable.number]; return next; });
    setPage("detalle");
  }
  function updateOrder(next: Exclude<OrderStatus, "Borrador">, table = currentTable) {
    const before = serviceStatus(orders, table);
    const allowed =
      (account?.role === "cajero" && before === "Por confirmar" && next === "En cocina") ||
      (account?.role === "mesero" && before === "Listo" && next === "Por cobrar") ||
      (account?.role === "cocina" && before === "En cocina" && next === "Listo");
    if (!allowed) return;
    setOrders((previous) => previous.map((order) =>
      order.table.number === table.number && order.status === before ? { ...order, status: next } : order));
  }
  function payOrder(payment: PaymentMethod) {
    if (account?.role !== "cajero" || !["Listo", "Por cobrar"].includes(status)) return;
    setOrders((previous) => previous.map((order) =>
      order.table.number === currentTable.number && order.status !== "Pagado" ? { ...order, status: "Pagado", payment } : order));
    setPage("caja");
  }
  function saveProduct(product: Product) {
    if (account?.role !== "administrador") return;
    setCatalog((previous) => previous.some((item) => item.id === product.id)
      ? previous.map((item) => item.id === product.id ? product : item) : [...previous, product]);
  }
  function recordStock(id: number, quantity: number) {
    if (account?.role !== "administrador" || quantity <= 0) return;
    setStock((previous) => previous.map((item) => item.id === id ? { ...item, quantity: Number((item.quantity + quantity).toFixed(2)), updated: "13:10 h" } : item));
  }
  useEffect(() => {
    document.title =
      (page === "detalle"
        ? "Comanda #" + currentOrder.id
        : pageTitles[page]) + " · Comandas";
  }, [page, currentOrder.id]);
  if (page === "menu") return <MenuCliente back={() => go(menuOrigin.current)} products={catalog} reviews={reviews} addReview={(rating, comment) => setReviews((previous) => [...previous, { id: Math.max(...previous.map((review) => review.id)) + 1, rating, comment }])} />;
  if (!account || page === "acceso") return <Acceso go={go} login={login} />;
  // La regla que filtra el menú también limita la navegación de la maqueta.
  const activePage = canVisit(account, page) ? page : account.home;
  const screens: Partial<Record<Page, ReactNode>> = {
    "inicio-mesero": <DashboardMesero go={go} orders={myOrders} openOrder={openOrder} />,
    pedidos: <PedidosMesero orders={myOrders} openOrder={openOrder} />,
    caja: <Caja orders={orders} openOrder={openOrder} />,
    inventario: <Inventario inventory={stock} recordStock={recordStock} />,
    resumen: <Dashboard go={go} paymentData={currentPayments} ticketCount={closedTickets + paidOrders.length} lowStock={stock.filter((item) => item.quantity < item.minimum)} />,
    mesas: (
      <Mesas
        go={go}
        tables={liveTables}
        orders={myOrders}
        selectedTable={currentTable}
        selectTable={setSelectedTable}
      />
    ),
    nueva: <NuevaComanda go={go} table={currentTable} sendOrder={sendOrder} products={catalog} draft={draft} orderId={nextId} changeDraft={(next) => setDrafts((previous) => ({ ...previous, [currentTable.number]: next }))} />,
    detalle: <Detalle go={go} table={currentTable} order={currentOrder} role={account.role} status={status} updateStatus={updateOrder} />,
    cocina: (
      <Cocina
        orders={orders}
        viewTable={openOrder}
        markReady={(table) => updateOrder("Listo", table)}
      />
    ),
    cierre: <Cierre key={currentOrder.id} go={go} table={currentTable} order={currentOrder} payOrder={payOrder} />,
    productos: <Productos products={catalog} saveProduct={saveProduct} />,
  };
  return (
    <AppLayout page={activePage} go={go} account={account} logout={logout}>
      {screens[activePage]}
    </AppLayout>
  );
}
