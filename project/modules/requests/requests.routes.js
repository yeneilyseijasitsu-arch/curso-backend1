import { Router } from 'express';
import { getFilteredRequests, updateRequestState } from '../../../activities/clase-3/src/modules/requests/requests.service.js';
import { requests } from '../../../activities/clase-3/src/modules/requests/requests.store.js';

const router = Router();

// GET /requests
router.get('/', (req, res) => {
  const result = getFilteredRequests(req.query);
  if (result.error) {
    return res.status(result.statusHttp).json({
      error: { code: result.code, message: result.message }
    });
  }
  // Colección válida pero sin coincidencias devuelve 200 OK con []
  return res.status(200).json(result.data);
});

// GET /requests/:id
router.get('/:id', (req, res) => {
  const request = requests.find(r => r.id === req.params.id);
  if (!request) {
    // Recurso individual inexistente devuelve 404 Not Found
    return res.status(404).json({
      error: { code: 'REQUEST_NOT_FOUND', message: `Request ${req.params.id} does not exist.` }
    });
  }
  return res.status(200).json(request);
});

// PATCH /requests/:id
router.patch('/:id', (req, res) => {
  const result = updateRequestState(req.params.id, req.body);
  if (result.error) {
    return res.status(result.statusHttp).json({
      error: { code: result.code, message: result.message }
    });
  }
  return res.status(200).json(result.data);
});

import { createRequest } from '../../../activities/clase-3/src/modules/requests/requests.service.js';

// POST /requests - Crear una nueva solicitud
router.post('/', (req, res) => {
  const result = createRequest(req.body);

  if (result.error) {
    return res.status(result.statusHttp).json({
      error: {
        code: result.code,
        message: result.message
      }
    });
  }

  return res.status(201).json(result.data); // 201 Created
});

export default router;