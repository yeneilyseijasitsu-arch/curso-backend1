// src/modules/requests/requests.store.js
import { REQUEST_STATUS } from '../../../../../project/modules/requests/request-status.js';
import { REQUEST_STATUS } from '../../../../../project/modules/requests/request-status.js';

// Nuestra lista de solicitudes en memoria
export const requests = [
  {
    id: '1',
    title: 'Reparar proyector',
    description: 'No enciende la luz',
    status: REQUEST_STATUS.PENDING,
    priority: 'HIGH',
    createdAt: new Date().toISOString(),
    history: [
      {
        previousStatus: null,
        newStatus: REQUEST_STATUS.PENDING,
        changedAt: new Date().toISOString()
      }
    ]
  }
];