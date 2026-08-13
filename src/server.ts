import express, { Application } from 'express';
import dotenv from 'dotenv';
import etudiantRoutes from './routes/etudiantRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/', etudiantRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});