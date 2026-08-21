import { Application, Request, Response, NextFunction } from 'express';
import { AuthService } from '../Service/authService';

const authService = new AuthService();

export const registerAuthRoutes = (app: Application): void => {
  // Inscription
  app.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      const result = await authService.register(email, password);
      res.status(201).json(result);
    } catch (error: any) {
      if (error.message === 'User already exists') {
        res.status(409).json({ message: error.message });
        return;
      }
      next(error);
    }
  });

  // Connexion
  app.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Invalid email or password') {
        res.status(401).json({ message: error.message });
        return;
      }
      next(error);
    }
  });
};