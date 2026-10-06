# Modelo de Datos — API de Solicitudes (Clase 4)

Diseño previo a la implementación en código e Inteligencia Artificial. Este documento detalla la estructura lógica, reglas de integridad y división de responsabilidades entre PostgreSQL y el servicio Backend.



## 1. Tabla `requests`
Representa la entidad principal de las solicitudes registradas en la plataforma.

| Columna | Tipo de dato | Nulo / Default | Restricciones / Reglas | Responsable de asignación |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | `NOT NULL` | `PRIMARY KEY GENERATED ALWAYS AS IDENTITY` | PostgreSQL |
| `title` | `TEXT` | `NOT NULL` | No se permite texto vacío o nulo | Cliente (API) |
| `description` | `TEXT` | Permite `NULL` | Ausencia explícita si no hay detalle | Cliente (API) |
| `priority` | `TEXT` | `DEFAULT 'medium'` | `CHECK (priority IN ('low', 'medium', 'high'))` | API / DB |
| `status` | `TEXT` | `DEFAULT 'open'` | `CHECK (status IN ('open', 'in_progress', 'resolved', 'cancelled'))` | API / DB |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Fecha/hora UTC fija de creación | PostgreSQL |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Se actualiza en cada modificación | PostgreSQL / API |



## 2. Tabla `request_status_history`
Almacena la trazabilidad e historial auditable de los cambios de estado sufridos por cada solicitud.

| Columna | Tipo de dato | Nulo / Default | Restricciones / Reglas | Propósito auditivo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | `NOT NULL` | `PRIMARY KEY GENERATED ALWAYS AS IDENTITY` | Identificador del evento de cambio |
| `request_id` | `BIGINT` | `NOT NULL` | `FOREIGN KEY REFERENCES requests(id) ON DELETE CASCADE` | Enlace directo con la solicitud origen |
| `previous_status`| `TEXT` | Permite `NULL` | `CHECK (previous_status IN ('open', 'in_progress', 'resolved', 'cancelled'))` | `NULL` únicamente en el evento de creación inicial |
| `new_status` | `TEXT` | `NOT NULL` | `CHECK (new_status IN ('open', 'in_progress', 'resolved', 'cancelled'))` | Estado de destino tras la transición |
| `changed_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Registro de fecha y hora exacta de la transición | Marca de tiempo del evento |



## 3. Relaciones e Integridad Referencial
- **Relación 1 a N (Uno a Muchos):** Una solicitud (`requests`) puede tener múltiples registros de cambio en `request_status_history`.
- **Integridad Referencial:** Se utiliza `FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE`. Esto garantiza que no existan registros huérfanos en el historial si una solicitud es eliminada.



## 4. Matriz de Responsabilidades

### A cargo de PostgreSQL (Capa de Persistencia)
1. **Generación de Llaves Primarias:** Secuencia autoincremental única e inalterable mediante `IDENTITY`.
2. **Validación de Tipos y Dominios:** Restricción estricta mediante clausulas `CHECK` para que solo ingresen estados y prioridades permitidos a nivel de motor.
3. **Consistencia Temporal Inicial:** Generación automática de marcas de tiempo UTC mediante `DEFAULT NOW()`.
4. **Protección Referencial:** Rechazo de inserciones en el historial para `request_id` inexistentes.

### A cargo del Backend (Capa de Aplicación / Node.js)
1. **Reglas de Transición de Estados:** La base de datos valida estados válidos individualmente, pero la API valida los saltos lógicos permitidos (ej. pasar de `open` a `in_progress`, o bloquear cambios si el estado actual es `cancelled`).
2. **Atomicidad de Operaciones:** Controlar las transacciones SQL (`BEGIN ... COMMIT / ROLLBACK`) para asegurar que al crear una solicitud se inserte simultáneamente la solicitud y su primer registro en el historial.
3. **Saneamiento y Mapeo:** Formatear datos de entrada, recortar espacios en blanco en títulos y mapear objetos del dominio en camelCase a columnas SQL en snake_case.



## 5. Duda Lógica de Diseño
- **Consulta sobre marcas de tiempo (`TIMESTAMPTZ`):** ¿PostgreSQL almacena la información convirtiéndola a UTC internamente sin importar la zona horaria del cliente o del servidor de base de datos? ¿Es buena práctica manejar la conversión a la hora local del usuario final únicamente en la capa de presentación (Frontend/API) al consultar los datos?