import { Application, Request, Response, NextFunction } from 'express';
import { StudentService } from '../Service/studentService';
import { authenticateJWT } from '../security/authMiddleware';

const studentService = new StudentService();

export const registerStudentRoutes = (app: Application): void => {
  // Routes publiques (lecture)
  app.get('/students', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await studentService.getAll();
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  });

  app.get('/students/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const student = await studentService.getById(id);

      if (!student) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }

      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  });

  // Routes protégées par JWT (création, modification, suppression)
  app.post('/students', authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newStudent = await studentService.create(req.body || {});
      res.status(201).json(newStudent);
    } catch (error: any) {
      if (error.message && error.message.includes('Required fields')) {
        res.status(400).json({ message: error.message });
        return;
      }
      next(error);
    }
  });

  const updateHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const updatedStudent = await studentService.update(id, req.body);

      if (!updatedStudent) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }

      res.status(200).json(updatedStudent);
    } catch (error) {
      next(error);
    }
  };

  app.put('/students/:id', authenticateJWT, updateHandler);
  app.patch('/students/:id', authenticateJWT, updateHandler);

  app.delete('/students/:id', authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const deleted = await studentService.delete(id);

      if (!deleted) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }

      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      next(error);
    }
  });
};