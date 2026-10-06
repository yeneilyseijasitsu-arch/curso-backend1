## My design before AI
Antes de consultar la IA, revisé las láminas de la clase 4 sobre la transición de datos en memoria a un backend persistente con PostgreSQL. Tenía identificadas las dos entidades necesarias (`requests` y `request_status_history`) y la lista de atributos básicos requeridos (`id`, `title`, `description`, `priority`, `status`, fechas). También tenía claro que la relación entre la solicitud y su historial debía ser de uno a muchos mediante una clave foránea.

## What I asked
Le pedí a la IA lo siguiente:
1. Explicar paso a paso la teoría de las láminas sobre persistencia y la salida del estado del proceso de Node.js.
2. Ayudarme a estructurar el archivo `data-model.md` con un diseño propio sin copiar el trabajo de otros compañeros.
3. Explicarme la diferencia técnica entre usar `VARCHAR(N)` y la combinación de `TEXT` con restricciones `CHECK` en PostgreSQL.
4. Diagnosticar un error `ENOENT` en la terminal al intentar ejecutar `npm run db:check`.

## What the AI proposed
- Un diseño de esquema utilizando `TEXT` junto con cláusulas `CHECK` explícitas para restringir los valores permitidos en `status` y `priority`.
- La inclusión explícita de `ON DELETE CASCADE` en la clave foránea `request_id` de la tabla de historial para evitar registros huérfanos.
- Una matriz clara de división de responsabilidades entre PostgreSQL (integridad, defaults, identificadores) y el Backend (máquina de estados, transacciones).
- Navegar a la subcarpeta correcta que contiene `package.json` mediante la terminal antes de ejecutar comandos de `npm`.

## What I accepted
- Adopté el modelo de datos basado en `TEXT` + `CHECK` porque ofrece mayor flexibilidad sin sacrificar la validación de integridad a nivel de base de datos.
- Acepté la regla de negocio que delega a la base de datos la generación de la identidad y fechas UTC, mientras que la API valida las transiciones lógicas de estado.
- Acepté la solución para la terminal, ubicándome en la carpeta correcta del proyecto para poder instalar dependencias y ejecutar los scripts.

## What I rejected
- Rechacé el uso de límites arbitrarios como `VARCHAR(200)` o `VARCHAR(30)` que no validan el contenido real de los datos.
- Rechacé copiar directamente las plantillas de otros estudiantes para garantizar que el diseño reflejara mis propias decisiones.

## Security mistakes I detected
- Comprobé la importancia de mantener la cadena `DATABASE_URL` aislada en el archivo local `.env`.
- Verifiqué que el archivo `.env` esté incluido en `.gitignore` para prevenir subir credenciales de Supabase al repositorio de Git.
- Evité imprimir la URL de conexión completa o contraseñas en los logs de la consola durante las pruebas de conexión.

## How I verified the implementation
- Verifiqué la estructura del directorio en la terminal utilizando comandos de navegación hasta encontrar la ubicación del `package.json`.
- Revisé la sintaxis SQL de las declaraciones DDL para asegurar compatibilidad con el motor de PostgreSQL.

## What I still do not understand
- Cómo gestiona internamente el `Session pooler` de Supabase (puerto 5432) la reutilización de conexiones cuando hay un volumen alto de peticiones concurrentes.
- Las mejores prácticas para formatear marcas de tiempo `TIMESTAMPTZ` almacenadas en UTC al mostrarlas en la zona horaria local del cliente en el frontend.