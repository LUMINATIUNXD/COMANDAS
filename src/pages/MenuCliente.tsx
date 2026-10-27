import { useState, type FormEvent } from "react";
import Brand from "../components/Brand";
import Icon from "../components/Icon";
import { Badge } from "../components/UI";
import { money, type Product } from "../data/demo";
export default function MenuCliente({ back, products, reviews, addReview }: {
  back: () => void; products: Product[]; reviews: { id: number; rating: number; comment: string }[];
  addReview: (rating: number, comment: string) => void;
}) {
  const [category, setCategory] = useState("Todos");
  const categories = ["Todos", "Platillos", "Bebidas", "Postres"];
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  function submitReview(event: FormEvent) {
    event.preventDefault();
    if (comment.trim().length < 3) { setMessage("Escribe al menos 3 caracteres en tu comentario."); return; }
    addReview(rating, comment.trim());
    setComment("");
    setMessage("Reseña agregada a esta prueba.");
  }
  return (
    <div className="customer-shell">
      <a className="skip" href="#menu-contenido">
        Saltar al menú
      </a>
      <header className="customer-header">
        <Brand />
        <button className="text-button" type="button" onClick={back}>
          <Icon name="atras" size={17} />
          Volver
        </button>
      </header>
      <main id="menu-contenido">
        <div className="customer-title">
          <div>
            <p className="eyebrow">Salón principal</p>
            <h1>Nuestro menú</h1>
            <p className="muted">Cocina de la casa</p>
          </div>
          <span className="menu-currency">Precios en MXN</span>
        </div>
        <div className="category-tabs" aria-label="Categorías del menú">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={item === category}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="customer-layout">
          <section
            className="menu-list"
            aria-label="Platillos y bebidas"
            aria-live="polite"
          >
            {categories
              .slice(1)
              .filter((name) => category === "Todos" || category === name)
              .map((name) => (
                <section className="menu-section" key={name}>
                  <h2>{name}</h2>
                  {products
                    .filter((product) => product.category === name)
                    .map((product) => (
                      <article className="menu-item" key={product.id}>
                        <div>
                          <h3>{product.name}</h3>
                          <p>{product.description}</p>
                          {!product.available && (
                            <Badge warm>Agotado por hoy</Badge>
                          )}
                        </div>
                        <strong className="num">{money(product.price)}</strong>
                      </article>
                    ))}
                </section>
              ))}
          </section>
          <aside className="review-panel">
            <h2>Reseñas</h2>
            <div className="review-score">
              <strong className="num">{average.toFixed(1)}</strong>
              <div>
                <div className="stars" aria-label={`${average.toFixed(1)} de 5 estrellas`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Icon name="estrella" size={16} key={n} />
                  ))}
                </div>
                <span>{reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}</span>
              </div>
            </div>
            <div className="review-list">{[...reviews].reverse().slice(0, 3).map((review) => <blockquote key={review.id}><span>{review.rating}/5</span>“{review.comment}”</blockquote>)}</div>
            <form className="review-form" onSubmit={submitReview}>
              <h3>¿Qué te pareció?</h3>
              <label htmlFor="calificacion">Calificación</label>
              <select id="calificacion" value={rating} onChange={(event) => setRating(Number(event.target.value))}>{[5, 4, 3, 2, 1].map((item) => <option key={item} value={item}>{item} de 5</option>)}</select>
              <label htmlFor="resena">Tu comentario</label>
              <textarea
                id="resena"
                placeholder="Cuéntanos tu experiencia"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                required minLength={3} maxLength={300}
                rows={3}
              />
              <button className="action secondary" type="submit">
                Publicar reseña
              </button>
              <p className="demo-caption">
                Las reseñas de esta prueba se reinician al recargar.
              </p>
              <p className="form-feedback" role="status">{message}</p>
            </form>
          </aside>
        </div>
      </main>
      <footer className="customer-footer">
        <span>Comandas · Menú de muestra</span>
        <span>Buen provecho.</span>
      </footer>
    </div>
  );
}
