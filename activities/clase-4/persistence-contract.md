# persistence-contract — Operaciones del Store

Fase 1 · Definición de la interfaz entre la capa de base de datos (`store`) y la capa de lógica de negocio (`service`).
**Regla de Arquitectura:** El `store` realiza consultas, maneja transacciones y mapea filas de SQL (`snake_case`) a objetos de JavaScript (`camelCase`). El `store` no lanza excepciones de HTTP (como 404), solo devuelve datos o `null`.



## 1. `findAll(filters)`
- **Entrada:** Objeto `filters` opcional con las propiedades `status` o `priority`.
- **Consulta:** 
  ```sql
  SELECT id, title, description, priority, status, created_at, updated_at 
  FROM requests 
  WHERE ($1::text IS NULL OR status = $1)
  ORDER BY created_at DESC;