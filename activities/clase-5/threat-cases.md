# Casos adversariales — Request API v5

Describe al menos ocho ataques que tu implementación deberá resistir, con el
resultado exacto esperado (código HTTP + `error.code`). Piensa como quien NO
respeta tu frontend: registro con `role`, `createdBy` inventado, IDs ajenos,
tokens editados o vencidos, bodies mixtos, headers extraños…

1. **Registro con escalada de privilegios (Mass Assignment):** 
   Un atacante envía `POST /auth/register` incluyendo el campo `"role": "agent"` en el body JSON para intentar crearse una cuenta administrativa.
   * **Resultado esperado:** `400 SERVER_CONTROLLED_FIELD`

2. **Suplantación de autoría en creación:** 
   Un `requester` autenticado hace un `POST /requests` enviando `"createdBy": 99` en el body para crear un ticket a nombre de otro cliente.
   * **Resultado esperado:** `400 SERVER_CONTROLLED_FIELD`

3. **Intento de lectura ajena (Ataque IDOR):** 
   Un `requester` altera la URL en su navegador y envía `GET /requests/42` para intentar leer un ticket que pertenece a otra persona.
   * **Resultado esperado:** `404 REQUEST_NOT_FOUND` (Ocultando así que el ticket 42 realmente existe).

4. **Falsificación de identidad (Token editado):** 
   Un atacante toma su JWT válido, lo decodifica, cambia su rol a `agent` en el payload, lo vuelve a armar y lo envía. Como la firma criptográfica ya no coincide, el middleware lo detecta.
   * **Resultado esperado:** `401 INVALID_TOKEN`

5. **Reutilización de sesión (Token vencido):** 
   Un usuario malicioso intenta acceder a `GET /auth/me` enviando un token legítimo pero que fue emitido hace más de 1 hora y ya superó su tiempo de expiración.
   * **Resultado esperado:** `401 INVALID_TOKEN`

6. **Petición fantasma (Falta de headers):** 
   Un script automatizado intenta hacer un `GET /requests` sin incluir la cabecera `Authorization: Bearer <token>`.
   * **Resultado esperado:** `401 AUTHENTICATION_REQUIRED`

7. **Violación de máquina de estados (Edición ilegal):** 
   Un `requester` hace un `PATCH /requests/10` intentando editar el título de un ticket que es suyo, pero que un agente ya marcó como `closed`.
   * **Resultado esperado:** `403 FORBIDDEN` (La política dicta que solo se editan tickets en estado `open`).

8. **Enumeración de usuarios (Ataque de fuerza bruta de correos):** 
   Un atacante prueba miles de correos al azar en `POST /auth/login` con claves falsas, esperando que el servidor le avise cuáles correos sí están registrados.
   * **Resultado esperado:** `401 INVALID_CREDENTIALS` (Respuesta genérica obligatoria, sin importar si falló el correo o la clave).
