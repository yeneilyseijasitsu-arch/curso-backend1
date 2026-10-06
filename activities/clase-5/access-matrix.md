# Matriz de acceso — Request API v5

Dos roles exactos: `requester` y `agent`. Sin `admin`.

Completa cada celda con `Sí`, `No`, `Propias` o `Propia y abierta`.
La matriz puede discutirse, pero la implementación converge en la baseline
del taller (lámina Contrato fijo).

| Operación | Anónimo | Requester | Agent |
| --------- | ------: | --------: | ----: |
| `POST /auth/register` | Sí | Sí | Sí |
| `POST /auth/login` | Sí | Sí | Sí |
| `GET /auth/me` | No | Sí | Sí |
| `GET /requests` | No | Propias | Sí |
| `GET /requests/:id` | No | Propias | Sí |
| `GET /requests/:id/history` | No | Propias | Sí |
| `POST /requests` | No | Sí | No |
| Editar título/descripción | No | Propia y abierta | No |
| Cambiar prioridad | No | No | Sí |
| Cambiar estado | No | No | Sí |

## Campos controlados por el servidor

POST /auth/register : role, id, createdAt, passwordHash
POST /requests y PATCH : createdBy, status, id
Respuesta exacta : 400 SERVER_CONTROLLED_FIELD.


## Solicitudes heredadas

¿Quién ve las solicitudes sin propietario (`created_by IS NULL`)? ¿Por qué?

El rol 'Agent' (agente). Recibe y supervisa absolutamente todas las solicitudes que recibe, incluyendo las que no tienen un propietario especifico.

El Requester tiene la orden exacta de solo ver sus propios registros filtrados mediante ' WHERE created_by = actor.userId '. Al ser NULL la condición falla y la base de datos no le devuelve nada.