# Responsibility map — Clase 08

Mapa de responsabilidades del handler cargado ANTES de refactorizar.
Complétalo mientras lees `GET /:id/history` en `requests.routes.js`.

## El handler analizado

Ruta/operación: `GET /requests/:id/history`

## Clasificación de bloques

Para cada bloque del handler, anota a qué categoría pertenece y qué líneas
lo forman (aprox.):

| Categoría | ¿Qué hace ese bloque aquí? | ¿A qué archivo debería moverse? |
| --- | --- | --- |
| HTTP (leer params/identidad) | Leer request, elegir status, responder |  |
| Aplicación (coordinar el caso) | Coordinar los pasos del caso de uso |  |
| Negocio (¿puede verse?) | Validad reglas y permisos |  |
| Persistencia (SQL) | Consultas SQL, transacciones y manejo de BD |  |
| Presentación (construir respuesta) | Formatear datos de BD a JSON publico |  |
| Observabilidad (errores/requestId) | Logaritmo, rastrar errores y metricas |  |

## Las preguntas del análisis

* ¿Cuántas RAZONES distintas tiene esta función para cambiar?

  [COMPLETAR]

* ¿Qué piezas ya existentes del proyecto duplica? (pista: mira store, mapper y policy)

  [COMPLETAR]

* ¿Qué NO se puede probar de forma aislada mientras todo viva junto?

  [COMPLETAR]
