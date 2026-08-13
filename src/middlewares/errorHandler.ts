import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Erreur :', err.message);
  res.status(500).json({
    status: 500,
    message: 'Erreur interne du serveur',
    error: err.message,
  });
};