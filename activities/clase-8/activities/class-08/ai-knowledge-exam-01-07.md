# Examen de conocimiento asistido por IA — clases 1-7

Guarda aquí el TRANSCRIPT COMPLETO de tu examen conversacional
(ITSU-KNOWLEDGE-01-07-1.0): todas las preguntas, todas tus respuestas,
todas las repreguntas y los cuatro bloques del cierre. Sin editar.

> Este examen complementa la evaluación de evidencia: mide lo que puedes
> explicar SIN el repositorio delante. El docente cruza ambos resultados
> y puede verificar cualquier respuesta oralmente.

## Metadata de mi examen

* studentId: yeneilyseijas.itsu@gmail.com
* Modelo utilizado: Gemini 
* Fecha: 29/9/2026
* ¿Formato inválido y reparado una vez?: [no / sí / MODEL_FORMAT_FAILURE]

## TRANSCRIPT COMPLETO (desde COMENZAR hasta el BLOQUE 4)

ITSU-KNOWLEDGE|V=1.0|R=BACKEND-01-07-K1|C01=1|C02=1|C03=2|C04=1|C05=1|C06=X|C07=X|ACTION=SUPPORT

```json
{
  "resultCode": "ITSU-KNOWLEDGE|V=1.0|R=BACKEND-01-07-K1|C01=1|C02=1|C03=2|C04=1|C05=1|C06=X|C07=X|ACTION=SUPPORT",
  "studentId": "NO_PROVIDED",
  "action": "SUPPORT",
  "signals": ["NO_ANSWER"],
  "classes": [
    {
      "classId": "01",
      "level": 1,
      "question": "Viaje completo de una petición y proceso del servidor backend.",
      "evidence": "la base de datos necesita constantemente recibir informacion para responder, y se disena de esa forma para evitar una sobrecarga de informacion"
    },
    {
      "classId": "02",
      "level": 1,
      "question": "Ubicación de datos en petición HTTP de creación (POST) y código de respuesta.",
      "evidence": "si con http te refieres a una url, principalmente va el titulo y despues la descripción, y si funciona correctamente debe responder con el codigo de estado 200"
    },
    {
      "classId": "03",
      "level": 2,
      "question": "Validación de transiciones de estado e identificación del código HTTP adecuado.",
      "evidence": "debe rechazarla ya que va en contra del flujo principal... el codigo que responderia a esa peticion seria 403"
    },
    {
      "classId": "04",
      "level": 1,
      "question": "Consultas parametrizadas frente a interpolación SQL e inyección de código.",
      "evidence": "es mas seguro seguir los parametros antes que mandar datos desconocidos con la interpolacion... si se incluye comando sql en un campo de texto se expondria el comando, aparte de que no funcionaria directamente"
    },
    {
      "classId": "05",
      "level": 1,
      "question": "Estructura de JWT, verificación de firma en backend e integridad de la identidad.",
      "evidence": "dentro del token viaja informacion importante... puede ser porque no sigue los parametros, o si ya estaba registrado anteriormente entonces no coincide"
    },
    {
      "classId": "06",
      "level": "X",
      "question": "Fases fundamentales de una prueba automatizada (preparación, acción, comprobación).",
      "evidence": "Sin respuesta por cierre prematuro del examen."
    },
    {
      "classId": "07",
      "level": "X",
      "question": "Sin formular por finalización anticipada.",
      "evidence": "Sin respuesta por cierre prematuro del examen."
    }
  ],
  "reviewTopics": [
    "Anatomía HTTP y envío de payloads en el cuerpo (POST/Body vs URL)",
    "Seguridad en persistencia: Inyección SQL y separación de comandos/parámetros",
    "Mecanismo de firma criptográfica en JWT e integridad de la identidad"
  ],
  "teacherDigest": "El estudiante muestra nociones sobre reglas de negocio y flujos de estado, pero revela confusiones importantes en anatomía HTTP, consultas parametrizadas y firmas JWT. El examen finalizó de forma anticipada en la Clase 6 a solicitud del estudiante."
}

```

### BLOQUE 3 — REPORTE DEL ESTUDIANTE

**Lo que explicaste bien:**

* **Reglas y flujos de estado (Clase 3):** Explicaste correctamente que el servidor backend debe rechazar un cambio de estado arbitrario (como pasar de `BORRADOR` a `APROBADA`) porque viola las reglas de negocio y el flujo consecutivo establecido en la aplicación.

**Aspectos a reforzar revelados por las repreguntas:**

* **Proceso del servidor y contrato HTTP (Clases 1 y 2):** En la Clase 1 atribuiste la disponibilidad continua a la base de datos en lugar de al proceso servidor escuchando en la red. En la Clase 2 indicaste que los datos para crear un recurso deben ir dentro de la URL en lugar del cuerpo (*body*) de la petición `POST`, proponiendo además un código 200 en vez del `201 Created`.
* **Manejo de códigos de estado HTTP (Clase 3):** Aunque identificaste bien la razón de negocio para rechazar el cambio de estado, asociaste el rechazo por estado incompatible con un código `403` (Prohibido/Autorización) en lugar del código `409` (Conflicto).
* **Consultas parametrizadas y seguridad (Clase 4):** No detallaste el concepto de inyección SQL ni el mecanismo por el cual el motor de la base de datos separa la fase de compilación del comando SQL de los datos enviados como parámetros.
* **Validación e integridad de tokens JWT (Clase 5):** Explicaste la presencia del inicio de sesión dentro del token, pero en la repregunta no identificaste la firma criptográfica (*signature*) con clave secreta como la herramienta que usa el servidor para verificar si un token fue alterado.
* **Clases 6 y 7:** Quedaron inconclusas por cierre solicitado durante la sesión.

**Temas prioritarios de repaso:**

1. **Anatomía de una petición HTTP (Métodos, Headers y Body):** Revisar dónde se ubican los payloads de creación (`POST`/`PUT`) y por qué no deben viajar como parte de la URL.
2. **Seguridad e Inyección SQL:** Analizar cómo los controladores/drivers de base de datos parametrizan las variables para evitar la ejecución accidental o maliciosa de comandos SQL.
3. **Firmas en JWT:** Estudiar la estructura Header.Payload.Signature de los JSON Web Tokens y cómo la verificación de la firma en cada petición protege la identidad sin consultar la base de datos.

### BLOQUE 4 — FEEDBACK DOCENTE

* **Prioridades transversales:** Es necesario afianzar la precisión de los conceptos técnicos de la capa backend (diferencia entre URL/Body, manejo exacto de códigos de respuesta HTTP y mecanismos criptográficos de validación). Se recomienda evitar respuestas generales o tautológicas y profundizar en las implicaciones de seguridad.
* **Señales registradas:** `NO_ANSWER` (interrupción del examen por parte del estudiante antes de responder las preguntas correspondientes a las Clases 6 y 7).
* **Preguntas orales sugeridas para posterior verificación:**
1. *Pregunta:* ¿Cuál es la diferencia entre enviar datos en la Query/Path de la URL y enviarlos en el Body de una petición HTTP, y por qué el Body es el canal correcto para crear recursos?
*Respuesta mínima esperada:* La URL identifica o filtra recursos y tiene limitaciones de tamaño y privacidad (queda grabada en logs/historial); el Body transporta datos estructurados y complejos sin exponerlos en la URI ni limitar su tamaño.
2. *Pregunta:* ¿Cómo detecta el servidor que un token JWT fue manipulado en el cliente sin necesidad de consultar la base de datos?
*Respuesta mínima esperada:* Recalcula la firma criptográfica (*signature*) usando el Header, el Payload recibido y su clave secreta interna. Si los datos fueron alterados, la firma recalculada no coincide con la del token y la petición se rechaza.


* **Nivel de confianza del examen:** Medio-Bajo (Evaluación incompleta por finalización anticipada solicitada por el estudiante).

## Metacognición (responde tú, después del examen)

1. ¿Qué pregunta o repregunta te costó más, y por qué crees que fue esa?

 Me costó la mayoria, mas que todo por explicaciones con lenguaje tecnico, lenguaje que aun no domino del todo, solo puedo explicarlo de forma superficial y con ejemplos simples que se puedan comprender al menos un poco, pero no con ejemplos tecnicos. 

2. Compara este resultado con tu reporte de evidencia: ¿coinciden? ¿Dónde difieren y qué te dice esa diferencia?

[COMPLETAR]
