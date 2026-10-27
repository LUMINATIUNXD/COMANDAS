import { useEffect, useRef, useState, type ReactNode } from "react";
import Brand from "./Brand";
import Icon, { type IconName } from "./Icon";
import type { Navigate, Page } from "../types/navigation";
import { canVisit, type DemoAccount } from "../data/access";

const navigation: { page: Page; label: string; icon: IconName }[] = [
  { page: "inicio-mesero", label: "Mi turno", icon: "venta" },
  { page: "mesas", label: "Mesas", icon: "mesas" },
  { page: "nueva", label: "Tomar pedido", icon: "pedido" },
  { page: "pedidos", label: "Mis pedidos", icon: "comanda" },
  { page: "caja", label: "Pedidos y cobros", icon: "comanda" },
  { page: "cocina", label: "Cocina", icon: "cocina" },
  { page: "resumen", label: "Dashboard", icon: "venta" },
  { page: "inventario", label: "Inventario", icon: "productos" },
  { page: "productos", label: "Productos", icon: "productos" },
];

export default function AppLayout({
  page,
  go,
  children,
  account,
  logout,
}: {
  page: Page;
  go: Navigate;
  children: ReactNode;
  account: DemoAccount;
  logout: () => void;
}) {
  const main = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleNavigation = navigation.filter((item) => canVisit(account, item.page));
  const activePage = page === "detalle" || page === "cierre"
    ? account.role === "mesero" ? "pedidos" : account.home
    : page;
  const active = visibleNavigation.find((item) => item.page === activePage);

  useEffect(() => {
    setMenuOpen(false);
    main.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="app-shell">
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="app-header">
        <Brand />
        <span className="terminal-label">
          {account.area} <span aria-hidden="true">/</span> Terminal 01
        </span>
        <div className="header-user">
          <span className="avatar" aria-hidden="true">
            {account.name[0]}
          </span>
          <span>
            {account.name} <small>{account.label} · {account.staffId}</small>
          </span>
        </div>
        <button
          className="icon-button mobile-menu"
          type="button"
          aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "cerrar" : "navegacion"} />
        </button>
      </header>
      <div className="mobile-context">
        <span>{active?.label}</span>
        <span>Terminal 01</span>
      </div>
      <nav
        id="main-nav"
        className={"command-nav" + (menuOpen ? " is-open" : "")}
        aria-label="Navegación principal"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setMenuOpen(false);
            main.current?.focus();
          }
        }}
      >
        {visibleNavigation.map((item) => {
          const selected = activePage === item.page;
          return (
            <button
              key={item.page}
              type="button"
              aria-current={selected ? "page" : undefined}
              onClick={() => {
                setMenuOpen(false);
                go(item.page);
              }}
            >
              <Icon name={item.icon} size={19} />
              {item.label}
            </button>
          );
        })}
        {canVisit(account, "menu") && <button type="button" className="nav-client" onClick={() => go("menu")}>
          <Icon name="menu" size={19} />
          Menú del cliente
        </button>}
      </nav>
      <main id="contenido" ref={main} tabIndex={-1}>
        {children}
      </main>
      <footer className="workspace-footer">
        <span>Maqueta · Datos de ejemplo</span>
        <button type="button" onClick={logout}>
          <Icon name="salir" size={17} /> Cambiar usuario
        </button>
      </footer>
    </div>
  );
}
