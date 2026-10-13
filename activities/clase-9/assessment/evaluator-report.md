# Evaluator report

Guarda aquí los bloques 1, 3 y 4 de tu evaluación:

## BLOQUE 1 — RESULT_CODE

ITSU-KNOWLEDGE|V=1.0|R=BACKEND-01-08-K1|ID=K09-yeneilyseijas-itsu-e02d148|Q1=1-2-1-2|Q2=2-2-2-2|Q3=2-2-2-2|Q4=1-2-1-2|Q5=2-2-2-2|ACTION=SUPPORT

## BLOQUE 3 — Reporte del estudiante

Reporte de evaluación de conocimientos
Resultado general
El proceso de evaluación se ha completado de forma satisfactoria. Has demostrado un buen conocimiento general de la estructura del proyecto y has ubicado acertadamente la mayoría de los archivos clave, como authenticate.js, request.policy.js y requests.service.js. Presentas un razonamiento valioso al considerar la seguridad y los permisos de roles antes de agregar nuevas funcionalidades al sistema.

Para consolidar tus competencias en desarrollo backend, es fundamental reforzar la comprensión del flujo de ejecución de Express (el orden en que se invocan las capas) y la separación estricta de responsabilidades entre la autenticación y las reglas de negocio.

Desempeño por pregunta
Pregunta 1 (Flujo HTTP y arquitectura en capas): Identificaste los componentes principales (routes, service, mapper), pero invertiste el orden de ejecución y la ubicación del desacoplamiento de los objetos de petición HTTP (req y res).

Pregunta 2 (Integridad de datos y transacciones): Reconociste acertadamente la necesidad de cancelar la operación ante un fallo, aunque se presentó una confusión entre el carácter stateless del protocolo HTTP y la persistencia en la base de datos.

Pregunta 3 (Autenticación vs. Autorización): Relacionaste correctamente la verificación de tokens JWT con authenticate.js y las políticas de acceso con policy.js, además de señalar la relevancia del rol del usuario.

Pregunta 4 (Diagnóstico y transición de estados): Identificaste con claridad el síntoma del fallo (recibir un 200 OK en lugar de un 409 Conflict), pero atribuiste la solución al middleware de autenticación en lugar del módulo de estados.

Pregunta 5 (Análisis de requerimientos - CHANGE-02): Mostraste una buena visión preventiva al indicar que se deben validar los permisos del rol agent antes de permitir el uso de filtros especiales.

Conceptos demostrados
Ubicación de módulos: Identificación correcta de archivos de políticas, verificación de tokens y servicios.

Detección de síntomas: Capacidad para observar la discrepancia entre el código de estado HTTP esperado y el obtenido en las pruebas.

Análisis de seguridad preventivo: Reconocimiento de la necesidad de aplicar controles de acceso por rol ante nuevas solicitudes de producto.

Vacíos prioritarios
Flujo de capas en Node.js/Express: Entender que las peticiones HTTP entran primero por los enrutadores (routes), donde se leen req y res, y luego pasan a la capa de servicios (service).

Atomicidad y transacciones (ACID): Comprender que las operaciones compuestas (modificar requests y registrar en request_history) deben envolverse en una transacción de BD con capacidad de rollback.

Aislamiento de responsabilidades: Diferenciar las tareas de un middleware de autenticación (verificar firmas de tokens) de los módulos de lógica de dominio (validar reglas de transición de estado).

Rectificaciones valiosas
Frontera HTTP / Lógica de Negocio: La capa de servicios debe recibir datos puros de JavaScript (como IDs y payloads), dejando el manejo directo de los objetos HTTP req y res en la capa de rutas o controladores.

Manejo de inconsistencias: La propiedad stateless de HTTP significa que el servidor no guarda sesión en memoria entre peticiones, pero la base de datos sí debe garantizar la consistencia total de la información almacenada mediante transacciones.

Tres acciones de estudio
Rastreo de ejecución: Sigue el recorrido de la petición PATCH /requests/:id desde requests.routes.js, pasando por requests.service.js hasta requests.store.js, anotando qué datos se envían en cada paso.

Revisión de transacciones SQL: Revisa el archivo src/database/transaction.js para observar cómo se ejecutan consultas atómicas en PostgreSQL con bloques BEGIN y ROLLBACK.

Estudio de la máquina de estados: Examina la lógica del módulo src/modules/requests/request-status.js para identificar cómo se validan las combinaciones permitidas entre los estados open, in_progress, closed, etc.

Evidencia faltante
No se presentaron vacíos significativos por falta de respuesta, ya que abordaste las cinco preguntas de la evaluación. La principal necesidad radica en afinar la precisión técnica de los conceptos arquitectónicos y de flujo.

## BLOQUE 4 — Feedback para el docente


Feedback para el docente
Temas prioritarios a reforzar
Flujo de capas y ciclo de vida de la petición Express: Aclarar la secuencia Route -> Middleware -> Service -> Store.

Manejo de transacciones en BD: Explicar el concepto de atomicidad y el uso de transacciones relacionales frente a fallas parciales.

Delimitación de responsabilidades: Reforzar la diferencia entre autenticación (JWT) y lógica de negocio/dominio (maquinas de estado).

Preguntas orales de verificación sugeridas
Pregunta 1: ¿En qué capa o archivo de Express se reciben los objetos req y res, y por qué la capa de servicio no debe manipularlos directamente?

Respuesta mínima esperada: Se reciben en la capa de rutas/controladores (requests.routes.js). El servicio no los manipula para mantenerse desacoplado del protocolo HTTP y facilitar la reutilización y las pruebas unitarias.

Pregunta 2: Si falla la inserción en la tabla request_history, ¿qué mecanismo asegura que los cambios en la tabla requests no se guarden?

Respuesta mínima esperada: Una transacción de base de datos que ejecuta un ROLLBACK al detectar un error en cualquiera de las operaciones.

Pregunta 3: Si una prueba falla porque el servidor reabre una solicitud cerrada permitiendo una transición inválida, ¿por qué el problema debe corregirse en request-status.js y no en authenticate.js?

Respuesta mínima esperada: Porque authenticate.js se encarga únicamente de validar el token de identidad, mientras que request-status.js define las reglas de negocio sobre qué estados son válidos y cuáles no.

ANTES DE CERRAR ESTA VENTANA: exporta la conversación COMPLETA (desde este
prompt hasta este aviso) y guárdala en assessment/conversation-transcript.md.
Guarda el BLOQUE 2 en assessment/evaluator-report.json y los bloques 1, 3 y 4
en assessment/evaluator-report.md. Luego ejecuta: npm run assessment:validate
Debe ser TEXTO: una captura de pantalla no sirve como entrega.
