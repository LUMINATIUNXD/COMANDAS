# Point Zero - Aplicación web para restaurante

Point Zero tiene dos experiencias: una aplicación móvil para clientes y esta
aplicación web para la empresa. Esta versión web conserva el diseño original
de Comandas: acceso por roles, mesas, pedidos, caja, cocina, inventario,
productos, dashboard y menú del cliente.

La interfaz original está en la raíz del proyecto. El backend está separado en
backend/ para que el flujo sea fácil de revisar:

~~~text
React + TypeScript -> API Express -> repositorios -> MySQL
~~~

No se usa inteligencia artificial ni servicios de IA.

## Requisitos

- Node.js 20 o superior
- MySQL 8 o superior
- Git Bash

## Base de datos

La base de datos comandas_db ya existe en MySQL Workbench. El archivo
database/comandas_db.sql queda como respaldo del modelo y no borra tablas.
No es necesario ejecutarlo otra vez si tu base ya está creada.

En backend crea tu configuración local:

~~~bash
cd backend
npm install
cp .env.example .env
~~~

Edita .env con tu usuario y contraseña de MySQL.

## Ejecutar

Terminal 1, backend:

~~~bash
cd backend
npm run dev
~~~

Terminal 2, frontend:

~~~bash
npm install
npm run dev
~~~

El backend usa http://localhost:3000 y Vite normalmente usa
http://localhost:5173.

## Flujo principal

1. Entrar con un usuario de demostración.
2. Abrir Mesas y elegir una mesa libre.
3. Tomar un pedido y enviarlo a cocina.
4. Guardar la comanda en MySQL mediante la API.
5. Cambiar el estado desde Cocina.
6. Revisar Inventario y registrar una entrada.

Los códigos de demostración del acceso son 1234, 2345, 3456 y 4567. El acceso
visual es de muestra; las operaciones centrales se validan en el backend.

## Documentación

- docs/backend/endpoints.md: métodos, rutas y pruebas.
- docs/backend/arquitectura.md: flujo de capas.
- DESIGN.md: decisiones visuales.
- VALIDACION.md: revisión de interfaz.
