import type { Page, Role } from "../types/navigation";

export type DemoAccount = {
  role: Role;
  label: string;
  name: string;
  staffId: string;
  pin: string;
  area: string;
  description: string;
  home: Page;
  pages: readonly Page[];
};

// Accesos visibles de una maqueta. No son credenciales ni permisos de un servidor.
export const accounts: DemoAccount[] = [
  {
    role: "mesero", label: "Mesero", name: "Ana", staffId: "07", pin: "1234",
    area: "Salón principal", description: "Mesas y pedidos",
    home: "inicio-mesero",
    pages: ["inicio-mesero", "mesas", "nueva", "pedidos", "detalle", "menu"],
  },
  {
    role: "cajero", label: "Caja", name: "Luis", staffId: "02", pin: "2345",
    area: "Caja 01", description: "Confirmaciones y cobros",
    home: "caja", pages: ["caja", "detalle", "cierre"],
  },
  {
    role: "administrador", label: "Administrador", name: "Mariana", staffId: "01", pin: "3456",
    area: "Administración", description: "Métricas e inventario",
    home: "resumen", pages: ["resumen", "inventario", "productos"],
  },
  {
    role: "cocina", label: "Cocina", name: "Diego", staffId: "04", pin: "4567",
    area: "Cocina", description: "Preparación y entrega",
    home: "cocina", pages: ["cocina", "detalle"],
  },
];

export const canVisit = (account: DemoAccount, page: Page) =>
  account.pages.includes(page);
