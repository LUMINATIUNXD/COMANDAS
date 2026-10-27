const paths = {
  mesas:
    "M5 7h14v10H5z M8 3v1 M16 3v1 M8 20v1 M16 20v1 M1 10h1 M1 14h1 M22 10h1 M22 14h1",
  pedido: "M12 5v14 M5 12h14",
  comanda: "M6 3h12v18l-3-2-3 2-3-2-3 2z M9 8h6 M9 12h6",
  cocina: "M4 19h16 M6 16h12a6 6 0 0 0-12 0z M12 7V5 M10 5h4",
  venta: "M4 20V4 M4 20h17 M8 16v-4 M13 16V8 M18 16V5",
  productos: "m3 7 9-4 9 4-9 4z M3 7v10l9 4 9-4V7 M12 11v10",
  menu: "M4 4h7v16H4z M13 4h7v16h-7z",
  salir: "M9 4H4v16h5 M14 8l4 4-4 4 M9 12h12",
  flecha: "M5 12h14 M14 7l5 5-5 5",
  atras: "M19 12H5 M10 7l-5 5 5 5",
  borrar: "m9 5-7 7 7 7h12V5z M12 9l6 6 M18 9l-6 6",
  persona: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M4 21v-2a8 8 0 0 1 16 0v2",
  buscar: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0z M15 15l6 6",
  bebida: "M7 6h12l-2 15H9z M6 3h6l1 9 M8 11h10",
  navegacion: "M4 6h16 M4 12h16 M4 18h16",
  cerrar: "m6 6 12 12 M18 6 6 18",
  reloj: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M12 7v5l3 2",
  check: "m5 12 4 4L19 6",
  estrella:
    "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z",
} as const;
export type IconName = keyof typeof paths;
export default function Icon({
  name,
  size = 22,
}: {
  name: IconName;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
