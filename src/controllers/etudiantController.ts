import { Request, Response, NextFunction } from 'express';
import { EtudiantModel, IEtudiant } from '../models/etudiantModel';

export const getAllEtudiants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const etudiants: IEtudiant[] = await EtudiantModel.findAll();
    res.status(200).json(etudiants);
  } catch (error) {
    next(error);
  }
};

export const getEtudiantById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id as string, 10);
    const etudiant: IEtudiant | null = await EtudiantModel.findById(id);

    if (!etudiant) {
      res.status(404).json({ message: 'Étudiant non trouvé' });
      return;
    }

    res.status(200).json(etudiant);
  } catch (error) {
    next(error);
  }
};

export const createEtudiant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nom, prenom, email, age }: IEtudiant = req.body;

    if (!nom || !prenom || !email || age === undefined) {
      res.status(400).json({ message: 'Tous les champs (nom, prenom, email, age) sont requis' });
      return;
    }

    const newEtudiant: IEtudiant = await EtudiantModel.create({ nom, prenom, email, age });
    res.status(201).json(newEtudiant);
  } catch (error) {
    next(error);
  }
};

export const updateEtudiant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id as string, 10);
    const updatedEtudiant: IEtudiant | null = await EtudiantModel.update(id, req.body);

    if (!updatedEtudiant) {
      res.status(404).json({ message: 'Étudiant non trouvé' });
      return;
    }

    res.status(200).json(updatedEtudiant);
  } catch (error) {
    next(error);
  }
};

export const deleteEtudiant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id as string, 10);
    const deleted: boolean = await EtudiantModel.delete(id);

    if (!deleted) {
      res.status(404).json({ message: 'Étudiant non trouvé' });
      return;
    }

    res.status(200).json({ message: 'Étudiant supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};