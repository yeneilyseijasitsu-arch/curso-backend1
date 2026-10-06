# course-progress-evidence-01-07

Paquete de evidencia para el diagnóstico acumulativo 7 en 1.
Generado automáticamente — completa las secciones marcadas con [COMPLETAR] antes de ejecutar el prompt.

## Metadata

* studentId: yeneilyseijas.itsu@gmail.com
* promptVersion: ITSU-CHECKPOINT-01-07-1.0
* rubricVersion: BACKEND-01-07-R1
* generatedAt: 2026-09-29T14:40:08.874Z (EXECUTED_NOW)
* repoRoot: curso-backend
* commit: e943bef (EXECUTED_NOW)
* repositorioRemoto: https://github.com/yeneilyseijasitsu-arch/curso-backend.git (EXECUTED_NOW) — verifica que sea TU repositorio antes de continuar
* modeloUtilizado: [COMPLETAR después de ejecutar el prompt]

### Contexto de git (informativo, EXECUTED_NOW)

El curso se trabaja en computadoras compartidas: el historial local puede
estar incompleto o pertenecer a otra sesión sin que falte trabajo real.
Este contexto NO es evidencia requerida — la evidencia son los archivos
del repositorio remoto del estudiante y sus respuestas. La ausencia de
commits aquí no debe interpretarse como evidencia faltante.

```text
e943bef correcciones
4ab4806 actividad 6
f850da3 checkpoint: clase-5-access-design2
750eb76 checkpoint: clase-5-access-design
d0d540f cambios 2
ad69c65 cambios
f6a6922 todas las tareas hasta ahora
f0a5e9f curso backend
```

## Evidencia por clase

Los archivos listados existen en el repositorio (FOUND). Un archivo de salida guardado, como validation-evidence.txt, es TEXTO: demuestra que se guardó, no que se ejecutó (NOT_VERIFIED como ejecución).

### Clase 01 — Fundamentos de backend

* NOT_FOUND: ningún artefacto esperado de esta clase

### Clase 02 — HTTP y contratos

* FOUND: activities\clase-3\http-contract.md
* FOUND: project\docs\http-contract.md

Extracto de activities\clase-3\http-contract.md (redactado automáticamente):

```text

```

### Clase 03 — Recursos, estado y reglas

* FOUND: activities\clase-3\resource-model.md
* FOUND: activities\clase-3\test-matrix.md
* FOUND: activities\clase-3\transition-map.md
* FOUND: activities\clase-4\test-matrix.md

Extracto de activities\clase-3\resource-model.md (redactado automáticamente):

```text

```

### Clase 04 — PostgreSQL y persistencia

* FOUND: activities\clase-6\class-06-starter\scripts\seed.js
* FOUND: activities\clase-8\scripts\seed.js

### Clase 05 — Autenticación y autorización

* FOUND: activities\clase-5\access-matrix.md
* FOUND: activities\clase-5\auth-contract.md
* FOUND: activities\clase-5\threat-cases.md

Extracto de activities\clase-5\auth-contract.md (redactado automáticamente):

```text
# Contrato de autenticación — Request API v5

Documenta ANTES de implementar. Para cada endpoint: método, ruta, ¿público o
protegido?, body permitido, respuesta de éxito (código + forma) y CADA error
(código HTTP + `error.code`).

## POST /auth/register
Publico. Body permitido: `email`,`password` (nada más).
Éxito: `201 Created` -> `{"id", "email", "role". "requester", "createdAt" }`.
Errores:
-  `400 VALIDATION_ERROR` - falta email/password o password fuera de 15-128.
- `400 SERVER_CONTROLLED_FIELD` - el body trae `role`, `id`, `passwordHash`, `createdAt`  
- `409` ACCOUNT_CANNOT_BE_CREATED - email ya registrado (generico, no confirma existencia)

## POST /auth/login
Publico. Body permitido: `email`,`password` (nada más)
Exito: `200 OK` -> `{'accessToken': 'eyjhbG', 'tokenType': 'Bearer', 'expiresIn': 3600}`.
Errores: 
- `400 VALIDATION_ERROR` - falta email/password o password fuera de 15-128.
- `401 INVALID_CREDENCIALS` - Credenciales invalidas.

## GET /auth/me
Protegido. `Autorization: Bearer <token>` Body permitido: Ninguno
Éxito: `200 OK` -> `{"id": 1, "role": "requester"}`.
Errores:
- `401 AUTHENTICATION_REQUIRED` - No se envió el token.
- `401 INVALID_TOKEN` - El token expiró o es falsificado.


## Semántica de errores
[... 9 líneas más]
```

### Clase 06 — Onboarding y pruebas

* FOUND: activities\clase-6\class-06-starter\.gitignore
* FOUND: activities\clase-6\class-06-starter\README.md
* FOUND: activities\clase-6\class-06-starter\activities\class-06\README.md
* FOUND: activities\clase-6\class-06-starter\activities\class-06\validation-evidence.txt — salida guardada, NOT_VERIFIED como ejecución
* FOUND: activities\clase-6\class-06-starter\activities\class-06\work-log.md
* FOUND: activities\clase-6\class-06-starter\database\migrations\001_create_users.sql
* FOUND: activities\clase-6\class-06-starter\database\migrations\002_create_requests.sql
* FOUND: activities\clase-6\class-06-starter\database\migrations\003_create_request_history.sql
* FOUND: activities\clase-6\class-06-starter\database\migrations\004_add_constraints_and_indexes.sql
* FOUND: activities\clase-6\class-06-starter\package-lock.json
* FOUND: activities\clase-6\class-06-starter\package.json
* FOUND: activities\clase-6\class-06-starter\recovery\README.md
* … 40 archivo(s) más con el mismo patrón

Extracto de activities\clase-6\class-06-starter\activities\class-06\work-log.md (redactado automáticamente):

```text
# Class 06 work log

## Environment

What did I configure? R: .env para definir el DATABASE_URL y JWT_SECRET, database para colocar datos de prueba (seeder)
Which command confirmed that it worked? R: con el comando 'npm test'

## Request flow

Where does the request enter?
Where is authentication checked?
Where is authorization checked?
Where is PostgreSQL accessed?

## Bug fixed

What was happening?
What should happen?
Which file did I modify?
Which test protects the behavior?

## Feature implemented

What does GET /requests/:id/history do?
Who can use it?
How is the result ordered?

## Test explained

Choose one test.
[... 24 líneas más]
```

Extracto de activities\clase-6\class-06-starter\activities\class-06\validation-evidence.txt (redactado automáticamente):

```text
Pega aqui la salida final de: npm run validate:class-06
(la salida no contiene secretos; no agregues capturas de tu .env)

```

### Clase 07 — Diagnóstico y errores

* FOUND: activities\clase-8\scripts\validate-class-07.js
* FOUND: activities\clase-8\src\middleware\error-handler.js
* FOUND: activities\clase-8\src\middleware\request-id.js

## Estado previo a la clase 8

* Validadores disponibles (clases 1-7): activities\clase-6\class-06-starter\scripts\validate-class-06.js, activities\clase-8\scripts\validate-class-06.js, activities\clase-8\scripts\validate-class-07.js
* Carpetas de pruebas: NOT_FOUND
* Último commit antes del taller: e943bef

## Cuestionario diagnóstico (responde aquí, 3-6 líneas cada una)

Sé específico: cita archivos o rutas concretas de TU proyecto cuando puedas. La extensión no suma.

### Pregunta clase 01

Describe qué ocurre desde que una petición llega al backend hasta que sale una respuesta y explica por qué el servidor debe permanecer activo.

Respuesta: [COMPLETAR]

### Pregunta clase 02

Elige un endpoint del proyecto y explica cómo método, ruta, body y status forman su contrato.

Respuesta: [COMPLETAR]

### Pregunta clase 03

Explica, usando una solicitud del proyecto, la diferencia entre representación, dato inválido y transición incompatible con el estado actual.

Respuesta: [COMPLETAR]

### Pregunta clase 04

Explica la diferencia entre migración, seed y transacción, e indica dónde aparece cada concepto en el proyecto.

Respuesta: [COMPLETAR]

### Pregunta clase 05

Explica la diferencia entre autenticación y autorización y por qué un JWT decodificado todavía debe verificarse.

Respuesta: [COMPLETAR]

### Pregunta clase 06

Elige una prueba del proyecto, identifica preparación, acción y comprobación, y explica qué regresión protege.

Respuesta: [COMPLETAR]

### Pregunta clase 07

Describe un fallo investigado distinguiendo síntoma, hipótesis y causa; luego indica qué señal correspondería a health o readiness.

Respuesta: [COMPLETAR]

---
Nota de seguridad: este paquete fue generado excluyendo .env y redactando
posibles secretos. Revisa una vez más antes de pegarlo en un modelo:
si ves una credencial real, reemplázala por [REDACTED] y avisa al docente.
