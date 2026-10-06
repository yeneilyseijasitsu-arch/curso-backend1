# Mapa de Errores — API de Solicitudes (Clase 4)

Fase 1 · Clasificación de errores, mapeo a respuestas HTTP y reglas de logging.
**Regla de Seguridad Absoluta:** Ninguna respuesta hacia el cliente debe incluir detalles internos como cadenas de conexión, sentencias SQL brutas, contraseñas, ni trazas de pila (*stack traces*).



## 1. Clasificación por Categorías

| Categoría | Significado Técnico | Código HTTP | Filosofía de Respuesta |
| :--- | :--- | :--- | :--- |
| **Contrato** | Petición mal formada o datos incompletos en el body/query | `400 Bad Request` | Indicar al cliente exactamente qué campo falló. |
| **Recurso** | El identificador numérico consultado no existe en la base de datos | `404 Not Found` | Indicar que el elemento no fue localizado. |
| **Dominio** | Petición sintácticamente válida pero rechazada por la lógica de negocio | `409 Conflict` | Explicar por qué el estado actual impide la acción. |
| **Persistencia** | Fallo o violación de restricciones en el motor PostgreSQL | `500 Internal Error` | Ocultar el error de SQL y devolver un mensaje genérico seguro. |
| **Infraestructura** | La base de datos en Supabase está inalcanzable o pausada | `503 Service Unavailable` | Informar de indisponibilidad temporal del servicio. |
| **Interno** | Excepción imprevista no controlada en Node.js | `500 Internal Error` | Capturar la excepción sin revelar la pila de ejecución. |



## 2. Mapeo de Situaciones Concretas y Códigos PG

| Escenario / Situación | Código PostgreSQL (`pg`) | Categoría | Código HTTP | Código Interno de la App |
| :--- | :--- | :--- | :--- | :--- |
| Falta el campo obligatorio `title` | N/A (Validación API) | Contrato | `400` | `TITLE_REQUIRED` |
| Prioridad no permitida | N/A (Validación API) | Contrato | `400` | `INVALID_PRIORITY` |
| Estado de filtro no válido | N/A (Validación API) | Contrato | `400` | `INVALID_FILTER` |
| Solicitud con `id` inexistente | `0` filas devueltas | Recurso | `404` | `REQUEST_NOT_FOUND` |
| Salto de estado no permitido (ej: de `resolved` a `open`) | N/A (Regla de Negocio) | Dominio | `409` | `INVALID_STATUS_TRANSITION` |
| Intento de modificar solicitud cancelada/terminal | N/A (Regla de Negocio) | Dominio | `409` | `REQUEST_IN_TERMINAL_STATUS` |
| Violación de `NOT NULL` en DB | `23502` | Persistencia | `500` | `DATABASE_CONSTRAINT_ERROR` |
| Violación de regla `CHECK` en DB | `23514` | Persistencia | `500` | `DATABASE_CHECK_VIOLATION` |
| Violación de clave foránea (`request_id` inexistente) | `23503` | Persistencia | `500` | `INVALID_REFERENCE` |
| Falla de red / Base pausada en Supabase | `08000` / `57P01` / `ECONNREFUSED` | Infraestructura | `503` | `DATABASE_UNAVAILABLE` |
| Error imprevisto en driver de base de datos | Otro código crudo | Interno | `500` | `INTERNAL_SERVER_ERROR` |



## 3. Políticas de Diagnóstico y Logs

### Permitido en Servidor (Logs de Diagnóstico)
- Código nativo de error de Postgres (ej. `error.code = '23514'`).
- Nombre de la tabla o restricción afectada (ej. `requests_status_check`).
- Método HTTP y ruta donde ocurrió la falla (ej. `PATCH /requests/42/status`).
- Tiempo de respuesta de la consulta SQL.

### Prohibido en Servidor y Respuesta al Cliente
- La cadena de conexión `DATABASE_URL` o credenciales de la base de datos.
- Contraseñas o tokens en texto plano.
- Sentencias SQL crudas o concatenadas con valores ingresados por el usuario.
- *Stack traces* (trazas de pila de Node.js) en las respuestas devueltas hacia el cliente frontend.