# Revisión de la maqueta

Rediseño revisado el 24 de octubre de 2026.

- Nueve pantallas en archivos TSX separados dentro de src/pages.
- Encabezado, navegación, marca, iconos, tarjetas y ticket compartidos en src/components.
- React y TypeScript; Tailwind para estructura y CSS específico para el sistema visual.
- npm run build correcto: comprobación de TypeScript y compilación de Vite.
- 27 revisiones de tamaño: nueve pantallas a 375, 768 y 1280 px, con un h1 por vista y sin desbordamiento horizontal.
- Acceso: error al enviar vacío o 9876; entrada con 1234 y tecla Enter.
- Mesas: las seis se seleccionan por clic o teclado; el panel cambia número, capacidad, estado y acción.
- Libres muestra 03, 04 y 06; Ocupadas muestra 01, 02 y 05. La selección se mantiene entre vistas y se ajusta al cambiar de filtro.
- Pedido, detalle y cierre conservan la mesa elegida y calculan su total de muestra.
- Pedido: búsqueda sin coincidencias, recuperación a todos y filtro Bebidas comprobados.
- Productos: búsqueda sin coincidencias, contador y recuperación comprobados.
- Navegación plegable revisada en móvil y tablet.
- En móvil el enlace Ver pedido lleva al ticket dentro de la página.
- Recorrido Mesa 03 → Tomar pedido → Enviar a cocina → Detalle → Cocina comprobado.
- Detalle → Cierre → Confirmar cierre → Mesas comprobado.
- Un envío simulado de una mesa libre mantiene ese número en el monitor, sin crear ni guardar una lista real de pedidos.
- Cambio de vista lleva el foco al contenido. Campos etiquetados, foco visible y mensajes de acceso y búsquedas anunciados.
- Análisis de contraste de la propuesta visual anterior, sobre texto renderizado en las nueve vistas: mínimo observado 4.57:1 sobre fondos planos; sin combinaciones de texto activo inferiores a 4.5:1 en la muestra analizada.
- Consola del navegador sin advertencias ni errores durante el recorrido final.
- Capturas nuevas: nueve de escritorio y nueve de teléfono en docs/prototipo.
- Revisión y medidas guardadas en docs/revision-diseno.json.
- Sin API, backend, base de datos ni persistencia en el navegador.

La prueba de tamaños detecta desbordamiento y estructura básica; se complementó con inspección visual de escritorio y teléfono. El análisis de contraste no constituye una auditoría completa de accesibilidad.

El acceso solo demuestra la navegación. Los pedidos son predefinidos por mesa: mesa 03 $290 MXN, mesa 02 $85 MXN y mesa 05 $240 MXN. Enviar y cerrar cambian de escena; no guardan pedidos ni alteran mesas. Cocina usa En cocina → Listo; confirmar Pedido listo sigue pendiente, junto con agregar, editar, cobrar y publicar reseñas.

La instalación limpia con npm install y la compilación se comprobaron en otra carpeta durante la preparación anterior; no se modificaron las dependencias para este rediseño. package-lock.json procede de esa instalación limpia. Node.js y npm están instalados para el usuario; VS Code necesita una terminal nueva si tenía un PATH antiguo.

Git local está preparado en main, sin commit ni remoto. La publicación y la prueba desde un clon quedan para la etapa siguiente. La actividad completa también requiere los materiales descritos en docs/entrega.md.
