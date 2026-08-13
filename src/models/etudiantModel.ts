import { pool } from '../config/db';

export interface IEtudiant {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  age: number;
}

export class EtudiantModel {
  static async findAll(): Promise<IEtudiant[]> {
    const result = await pool.query<IEtudiant>('SELECT * FROM etudiants ORDER BY id ASC');
    return result.rows;
  }

  static async findById(id: number): Promise<IEtudiant | null> {
    const result = await pool.query<IEtudiant>('SELECT * FROM etudiants WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(etudiant: IEtudiant): Promise<IEtudiant> {
    const { nom, prenom, email, age }: IEtudiant = etudiant;
    const result = await pool.query<IEtudiant>(
      'INSERT INTO etudiants (nom, prenom, email, age) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom, prenom, email, age]
    );
    return result.rows[0];
  }

  static async update(id: number, etudiant: Partial<IEtudiant>): Promise<IEtudiant | null> {
    const { nom, prenom, email, age }: Partial<IEtudiant> = etudiant;
    const result = await pool.query<IEtudiant>(
      `UPDATE etudiants 
       SET nom = COALESCE($1, nom), 
           prenom = COALESCE($2, prenom), 
           email = COALESCE($3, email), 
           age = COALESCE($4, age) 
       WHERE id = $5 RETURNING *`,
      [nom, prenom, email, age, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM etudiants WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}