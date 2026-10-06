import express from 'express';
import requestsRouter from '../modules/requests/requests.routes.js';

const app = express();

// Permite que Express entienda el formato JSON que enviamos en las peticiones
app.use(express.json());

// Conectamos el módulo de solicitudes
app.use('/requests', requestsRouter);

export default app;