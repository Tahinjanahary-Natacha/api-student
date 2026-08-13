import { Router } from 'express';
import {
  getAllEtudiants,
  getEtudiantById,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
} from '../controllers/etudiantController';

const router: Router = Router();

router.get('/etudiants', getAllEtudiants);
router.get('/etudiants/:id', getEtudiantById);
router.post('/etudiants', createEtudiant);
router.put('/etudiants/:id', updateEtudiant);
router.patch('/etudiants/:id', updateEtudiant);
router.delete('/etudiants/:id', deleteEtudiant);

export default router;