# Revisión de la Actividad Sumativa 2

Revisión del PDF LITIID42, 24 de octubre de 2026.

## Lo que pide el documento

| Parte | Qué debe entregar el equipo | Estado actual |
|---|---|---|
| 1. Proceso | Objetivo, actores, inicio, actividades, decisiones con sus rutas, errores, estados, final y reglas de negocio | Falta desarrollar el reporte y el diagrama |
| 2. Interfaces | Inventario con usuario, objetivo, datos, acciones y conexiones; un boceto de baja fidelidad por pantalla principal; mapa con avances y regresos | Hay pantallas y bocetos anteriores en Figma. Falta actualizar los bocetos y el mapa al nuevo diseño |
| 3. Frontend | React + TS, HTML semántico, Tailwind, pages y componentes, estado local y pruebas en 375/768/1280 px | Maqueta con nueve pantallas, navegación, filtros, búsqueda y acceso de muestra. Pedido y demás operaciones siguen fijos |
| 4. GitHub | Proyecto completo, README, evidencias, acceso para el docente y prueba desde otra carpeta | Git local preparado; falta repositorio remoto, primer commit y prueba de clonación |

El PDF dice expresamente que **no se solicita API, base de datos ni autenticación real**. Sí pide interacciones de demostración. No hace falta construir un sistema de restaurante completo.

## Proceso que pueden documentar

**Gestión de una comanda:** el mesero abre una mesa, selecciona platillos, revisa el pedido y lo envía a cocina. Cocina lo recibe, lo prepara y avisa que está listo. El mesero lo entrega y después cierra la cuenta.

En el diagrama incluyan decisiones como mesa disponible, pedido con productos, producto agotado y confirmación de cierre. Cada decisión necesita ruta de sí y de no. Diferencien las operaciones propuestas de las que ya cambian estado en esta maqueta.

Inventario y RRHH completos no son necesarios para demostrar este recorrido. El menú del cliente puede quedar como complemento: el PDF aclara que una aplicación móvil del cliente queda fuera de esta entrega.

## Cómo preparar GitHub

1. Acuerden si usarán un repositorio existente del equipo. La conexión de GitHub consultada no devolvió repositorios accesibles; eso no demuestra que sus compañeros no tengan uno.
2. Si no existe, creen un repositorio vacío en GitHub, por ejemplo **comandas-restaurante**. El nombre es una propuesta. Al subir este proyecto existente, dejen sin crear otro README, licencia o .gitignore para evitar una primera mezcla innecesaria.
3. En VS Code abran **la carpeta comandas-maqueta**, no la carpeta de outputs completa.
4. Configuren el nombre y correo del autor de los commits si Git todavía no los tiene. Usen sus propios datos; no copien literalmente los marcadores de abajo.
5. Desde la terminal de esa carpeta:

~~~sh
git config user.name "TU NOMBRE"
git config user.email "TU CORREO DE GITHUB"
git add .
git commit -m "Agrega maqueta del comandero"
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
~~~

**URL_DEL_REPOSITORIO** es la URL real que les da GitHub, por ejemplo la que termina en .git. La rama local main ya está preparada. Todavía no hay commits ni archivos publicados.

6. En GitHub: **Settings → Collaborators → Add people** para invitar a los integrantes. Cada uno debe aceptar la invitación y trabajar desde su propia cuenta. Si el repositorio es privado, agreguen también al docente y comprueben que ya tenga acceso.
7. Desde otra carpeta, prueben con la URL real:

~~~sh
git clone URL_DEL_REPOSITORIO comandas-prueba
cd comandas-prueba
npm install
npm run dev
~~~

No suban node_modules ni dist; .gitignore ya los excluye. El README, el código y las capturas de docs sí van en el repositorio.

## Antes de entregar

- Completar el reporte por equipo con las partes 1 a 4.
- Actualizar los bocetos de baja fidelidad y el mapa de navegación.
- Acordar el nombre final y revisar la lista de integrantes del README.
- Subir el proyecto y comprobar instalación y ejecución desde un clon.
- Revisar que el docente pueda entrar y clonar.
- Entregar **un solo enlace exacto al repositorio por equipo**, en el medio indicado por el docente.
- Cada integrante debe conocer y explicar su participación, el flujo y el código.

La captura de Teams proporcionada indica vencimiento el **26 de octubre de 2026 a las 23:59**. La tarea aparecía como **No entregada**; no se ha enviado desde este trabajo.

## Guías de GitHub

- [Subir un proyecto local](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
- [Invitar colaboradores](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository)
