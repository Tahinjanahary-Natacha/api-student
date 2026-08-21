import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { registerStudentRoutes } from './Controllers/studentController';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

// Configuration de CORS
app.use(cors({
  origin: '*', // Permet toutes les origines (à restreindre en production si besoin)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

registerStudentRoutes(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});