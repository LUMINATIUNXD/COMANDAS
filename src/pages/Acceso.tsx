import { useState, type FormEvent } from "react";
import Brand from "../components/Brand";
import Icon from "../components/Icon";
import type { Navigate } from "../types/navigation";
import { accounts, type DemoAccount } from "../data/access";

export default function Acceso({ go, login }: { go: Navigate; login: (account: DemoAccount) => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  function changePin(value: string) {
    setPin(value.replace(/\D/g, "").slice(0, 4));
    setError("");
  }
  function enter(event: FormEvent) {
    event.preventDefault();
    const account = accounts.find((item) => item.pin === pin);
    if (!account) {
      setError("Código no reconocido. Revisa los 4 dígitos.");
      return;
    }
    login(account);
  }
  return (
    <div className="access-shell">
      <header className="access-header">
        <Brand />
        <span className="terminal-label">Terminal 01</span>
      </header>
      <main className="access-main">
        <section className="access-context">
          <p className="eyebrow">Comandas · Terminal 01</p>
          <h1>Acceso de personal</h1>
          <p className="muted">Tu código abre tu área de trabajo.</p>
          <button
            className="text-button"
            type="button"
            onClick={() => go("menu")}
          >
            Consultar menú <Icon name="flecha" size={18} />
          </button>
        </section>
        <section className="pin-panel" aria-labelledby="access-title">
          <div className="pin-heading">
            <h2 id="access-title">Ingresa tu código</h2>
            <p className="muted">Código de personal de 4 dígitos</p>
          </div>
          <form onSubmit={enter}>
            <label htmlFor="clave">Código de 4 dígitos</label>
            <input
              id="clave"
              className="pin-input"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              maxLength={4}
              value={pin}
              placeholder="····"
              aria-describedby="pin-message"
              aria-invalid={Boolean(error)}
              onChange={(event) => changePin(event.target.value)}
            />
            <div className="pin-grid" aria-label="Teclado numérico">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => changePin(pin + number)}
                >
                  {number}
                </button>
              ))}
              <button
                className="key-small"
                type="button"
                onClick={() => changePin("")}
              >
                Limpiar
              </button>
              <button type="button" onClick={() => changePin(pin + "0")}>
                0
              </button>
              <button
                type="button"
                aria-label="Borrar último dígito"
                onClick={() => changePin(pin.slice(0, -1))}
              >
                <Icon name="borrar" />
              </button>
            </div>
            <p id="pin-message" className="pin-message" aria-live="polite">
              {error}
            </p>
            <button className="action pin-enter" type="submit">
              Entrar <Icon name="flecha" size={18} />
            </button>
          </form>
        </section>
      </main>
      <footer className="access-footer">
        <span>Comandas · Equipo 3</span>
        <span>Maqueta sin conexión a datos</span>
      </footer>
    </div>
  );
}
