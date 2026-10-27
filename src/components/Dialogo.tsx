import { useEffect, useRef, type ReactNode } from "react";
import Icon from "./Icon";

export default function Dialogo({ title, close, children }: { title: string; close: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return <dialog ref={dialog} className="form-dialog" aria-labelledby="dialog-title" onCancel={(event) => { event.preventDefault(); close(); }}>
    <header><h2 id="dialog-title">{title}</h2><button type="button" className="icon-button" aria-label="Cerrar formulario" onClick={close}><Icon name="cerrar" size={18} /></button></header>
    {children}
  </dialog>;
}
