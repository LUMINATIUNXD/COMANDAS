# Diseño de Comandas

Propuesta aplicada el 24 de octubre de 2026. Nombre provisional.

La pantalla debe servir a tres tareas: reconocer una mesa, revisar un pedido y consultar el estado de cocina. La administración y el menú del cliente conservan su propio contenido.

## Qué cambió

| Vista | Decisión aplicada |
| --- | --- |
| Acceso | Clave y teclado en un panel compacto; instrucciones de muestra junto al campo. |
| Mesas | Plano blanco, seis mesas seleccionables y panel con estado, capacidad y acción de la mesa elegida. |
| Tomar pedido | Catálogo con descripción y precio; ticket a la derecha y acceso directo al resumen en móvil. |
| Comanda | Productos, importes, nota y progreso del pedido en dos zonas claras. |
| Cocina | Dos estados: En cocina y Listos. Hora de envío, cantidades, nota y una sola confirmación propuesta al terminar. |
| Cierre | Total y confirmación próximos; se aclara el alcance de la simulación. |
| Resumen | Una franja de métricas, desglose de pagos y ranking de productos; cifras sin tendencias inventadas. |
| Productos | Tabla de catálogo con búsqueda; filas compactas al pasar a teléfono. |
| Menú del cliente | Vista propia, categorías, precios y reseña de muestra. |

La barra de trabajo pasó de botones altos con icono encima a una fila de destinos. En teléfono se despliega desde el botón de navegación. Se retiraron iconos repetidos del catálogo, encabezados publicitarios y números de producto sin utilidad para este recorrido.

## Sistema visual

| Rol | Valor |
| --- | --- |
| Fondo | #F4F5F2 |
| Superficie | #FFFFFF |
| Texto principal | #252E2A |
| Texto secundario | #626B65 |
| Acción y selección | #285844 |
| Fondo verde suave | #EDF3EE |
| Aviso | #805B19 sobre #FCF4E3 |
| Bordes | #E0E4DF |
| Borde de campos | #A9B3AA |

Tipografía: Segoe UI del sistema, con Arial como alternativa. Título de trabajo de 25–28 px, sección de 16–17 px, lectura de 13–14 px y metadatos de 11–12 px. Cifras tabulares en precios, tiempos y cantidades. Controles principales de al menos 44 px de alto.

Los componentes usan radios de 4, 6 y 8 px según su tamaño. La mesa conserva su forma de mobiliario para que el plano se reconozca. Un clic selecciona; la acción principal abre su pedido o cuenta. Al cambiar un filtro que oculta la selección, se selecciona la primera mesa visible. Las superficies se separan con tono y borde, sin efectos de cristal ni movimiento de entrada.

Tailwind resuelve estructuras repetidas; index.css reúne tokens y reglas específicas de mesas, tickets, navegación y adaptación a pantalla.

## Adaptación a la referencia

De las fotografías de Soft Restaurant se toma el recorrido de acceso por clave, barra de acciones, plano y puesto de servicio. Se mantiene la barra horizontal porque coincide con esa referencia y permite llegar directamente a las tareas.

De Taste se toma la separación entre marco y superficie de trabajo, la navegación por subrayado y la jerarquía de datos. La propuesta adapta su hoja de estilo a esta maqueta: controles mayores para el comandero y verde en la acción principal, conforme a la preferencia del equipo.

Diseño práctico y UI UX Pro Max se usaron para revisar densidad, navegación móvil, estados, contraste y lectura de tablas. Las guías son referencias; las decisiones se comprobaron sobre estas pantallas.

## Móvil y tablet

- Navegación plegable por debajo de 901 px.
- Plano de dos columnas en teléfono y tres en tablet.
- Tomar pedido disponible arriba del plano en móvil.
- Enlace al ticket desde el encabezado del pedido.
- Tabla de productos convertida en filas con los mismos datos.
- Cocina y detalle apilados en teléfono.
- Menú del cliente separado de la barra del personal.

## Contenido y alcance

Cada mesa tiene un pedido de muestra. La mesa 03 conserva dos enchiladas y dos aguas de jamaica: $290 MXN. El número elegido se comparte entre pedido, detalle y cierre. Las ventas de muestra suman $3,480; los tres métodos de pago suman ese mismo importe. No se muestran comparaciones con fechas para las que no hay datos.

Las vistas son escenas de una maqueta: la mesa 03 está libre al inicio y el detalle muestra el pedido posterior. Enviar y cerrar permiten recorrer escenas; no actualizan un restaurante real. Los controles de alta, edición, confirmación de Pedido listo y reseñas están pendientes de implementación. Seleccionar una mesa actualiza el panel mediante estado local, sin guardar datos.

Se mantiene una pantalla por archivo en src/pages, componentes comunes en src/components y datos de muestra en src/data. La estructura pedida por la actividad se conserva.

## Revisión y archivos

- Compilación de TypeScript y Vite correcta.
- Nueve vistas revisadas a 375, 768 y 1280 px.
- Filtros, búsquedas, acceso de muestra, navegación y cierre recorridos.
- Capturas de escritorio en docs/prototipo y de teléfono en docs/prototipo/movil.
- Medidas de revisión en docs/revision-diseno.json.
- Alcance y comprobaciones en VALIDACION.md.

La revisión de contraste analiza texto renderizado sobre fondos planos. No equivale a una certificación completa de accesibilidad.

## Próxima etapa acordada

Revisar el repositorio del equipo, completar los materiales que pide el PDF y publicar y probar un clon. El reporte, los bocetos de baja fidelidad y el acceso del docente se resolverán en esa etapa.

Para continuar el diseño, conviene mantener esta estructura y sustituir los datos de ejemplo por el catálogo acordado. El nombre final y las fotografías pueden incorporarse después de que el equipo los defina.
