import { requests } from './requests.store.js';
import { VALID_TRANSITIONS, REQUEST_STATUS } from '../../../../../project/modules/requests/request-status.js';

let nextRequestId = 4;

export const createRequest = (data) => {
  // Validar título (400 Bad Request)
  if (!data.title || data.title.trim() === '') {
    return { 
      error: true, 
      code: 'INVALID_TITLE', 
      message: 'El título es obligatorio', 
      statusHttp: 400 
    };
  }

  const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
  // Validar prioridad desconocida (400 Bad Request)
  if (data.priority && !validPriorities.includes(data.priority.toUpperCase())) {
    return { 
      error: true, 
      code: 'UNKNOWN_PRIORITY', 
      message: 'Prioridad no válida. Debe ser low, medium o high.', 
      statusHttp: 400 
    };
  }

  const now = new Date().toISOString();

  const newRequest = {
    id: String(nextRequestId++),
    title: data.title.trim(),
    description: data.description ? data.description.trim() : '',
    priority: data.priority ? data.priority.toUpperCase() : 'MEDIUM', // 'medium' por defecto
    status: 'OPEN', // Siempre nace en 'OPEN'
    createdAt: now,
    updatedAt: now,
    history: [
      {
        previousStatus: null,
        newStatus: 'OPEN',
        changedAt: now
      }
    ]
  };

  requests.push(newRequest);
  return { success: true, data: newRequest };
};

export const getFilteredRequests = ({ status, priority }) => {
  const validStatuses = Object.values(REQUEST_STATUS);
  const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];

  // Validación de forma: filtro desconocido -> 400 Bad Request
  if (status && !validStatuses.includes(status.toUpperCase())) {
    return { error: 'INVALID_QUERY', code: 'UNKNOWN_STATUS', message: 'Estado de filtro desconocido', statusHttp: 400 };
  }
  if (priority && !validPriorities.includes(priority.toUpperCase())) {
    return { error: 'INVALID_QUERY', code: 'UNKNOWN_PRIORITY', message: 'Prioridad de filtro desconocida', statusHttp: 400 };
  }

  let result = requests;
  if (status) result = result.filter(r => r.status === status.toUpperCase());
  if (priority) result = result.filter(r => r.priority === priority.toUpperCase());

  return { success: true, data: result };
};

export const updateRequestState = (id, body) => {
  const request = requests.find(r => r.id === id);
  if (!request) {
    return { error: true, code: 'REQUEST_NOT_FOUND', message: `La solicitud ${id} no existe.`, statusHttp: 404 };
  }

  const { title, description, priority, status } = body;

  // Error de forma (400): Body sin ningún campo modificable
  if (!title && !description && !priority && !status) {
    return { error: true, code: 'EMPTY_BODY', message: 'Debe incluir al menos un campo para actualizar', statusHttp: 400 };
  }

  // Error de dominio (409): La solicitud está en un estado terminal (CLOSED o CANCELLED)
  if (request.status === REQUEST_STATUS.CLOSED || request.status === REQUEST_STATUS.CANCELLED) {
    return { error: true, code: 'TERMINAL_STATE', message: 'No se puede modificar una solicitud terminada', statusHttp: 409 };
  }

  // Si intentan cambiar el estado
  if (status) {
    const nextStatus = status.toUpperCase();
    const validStatuses = Object.values(REQUEST_STATUS);

    // Error de forma (400): Estado con nombre desconocido
    if (!validStatuses.includes(nextStatus)) {
      return { error: true, code: 'UNKNOWN_STATUS', message: 'Estado especificado desconocido', statusHttp: 400 };
    }

    // Error de dominio (409): Transición de estado no permitida por el ciclo de vida
    const allowedNext = VALID_TRANSITIONS[request.status] || [];
    if (nextStatus !== request.status && !allowedNext.includes(nextStatus)) {
      return { 
        error: true, 
        code: 'INVALID_STATUS_TRANSITION', 
        message: `No se puede pasar del estado ${request.status.toLowerCase()} a ${nextStatus.toLowerCase()}`, 
        statusHttp: 409 
      };
    }

    if (nextStatus !== request.status) {
      request.history.push({
        previousStatus: request.status,
        newStatus: nextStatus,
        changedAt: new Date().toISOString()
      });
      request.status = nextStatus;
    }
  }

  if (title) request.title = title.trim();
  if (description) request.description = description.trim();
  if (priority) request.priority = priority.toUpperCase();
  
  request.updatedAt = new Date().toISOString();

  return { success: true, data: request };
};