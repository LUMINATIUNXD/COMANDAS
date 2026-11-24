# Arquitectura

~~~mermaid
flowchart LR
  A[React Point Zero] --> B[API Express]
  B --> C[Controladores]
  C --> D[Repositorios]
  D --> E[(MySQL comandas_db)]
~~~

El frontend no contiene SQL. El controlador valida la entrada, el repositorio
ejecuta consultas parametrizadas y MySQL conserva los datos.
