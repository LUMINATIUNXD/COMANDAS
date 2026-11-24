# Endpoints de Point Zero

| Método | Ruta | Función | Respuestas |
|---|---|---|---|
| GET | /api/health | Comprueba API y MySQL | 200, 500 |
| GET | /api/productos | Consulta catálogo | 200 |
| POST | /api/productos | Registra producto | 201, 400 |
| PUT | /api/productos/:id | Modifica producto | 200, 400, 404 |
| GET | /api/inventario | Consulta existencias | 200 |
| PATCH | /api/inventario/:id/stock | Cambia stock | 200, 400, 404 |
| GET | /api/comandas | Lista comandas | 200 |
| POST | /api/comandas | Registra comanda e items | 201, 400, 404, 409 |
| PATCH | /api/comandas/:id/estado | Cambia estado de cocina | 200, 400, 404 |

## Pruebas

1. Crear comanda con producto disponible: 201, inserta Comanda, Pedido e Item_pedido y descuenta Inventario.
2. Enviar cantidad 0: 400 y no escribe en la base.
3. Usar un producto inexistente: 404.
4. Pedir más stock del disponible: 409.
5. Reiniciar la API y consultar /api/comandas: el registro permanece en MySQL.
