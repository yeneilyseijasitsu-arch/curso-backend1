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

¿Cuándo responde tu API `401`? ¿Cuándo `403`? ¿Cuándo `404` aunque el recurso
exista? ¿Cuándo `409`? Escribe el criterio, no solo ejemplos.

401: Fallo de identidad.
403: Fallo de autrización.
404: Ocultación y ausencia.
409: Conflicto.
