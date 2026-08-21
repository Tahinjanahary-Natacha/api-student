import { pool } from '../config/db';
import { IStudent } from '../Models/student';

export class StudentRepository {
  // Exemple dans studentRepository.ts
async findAll(): Promise<IStudent[]> {
  const result = await pool.query<IStudent>('SELECT id, nom AS "lastName", prenom AS "firstName", email, age FROM etudiants ORDER BY id ASC');
  return result.rows;
}

  async findById(id: number): Promise<IStudent | null> {
    const result = await pool.query<IStudent>('SELECT * FROM students WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(student: IStudent): Promise<IStudent> {
    const { lastName, firstName, email, age } = student;
    const result = await pool.query<IStudent>(
      'INSERT INTO students (last_name, first_name, email, age) VALUES ($1, $2, $3, $4) RETURNING *',
      [lastName, firstName, email, age]
    );
    return result.rows[0];
  }

  async update(id: number, student: Partial<IStudent>): Promise<IStudent | null> {
    const { lastName, firstName, email, age } = student;
    const result = await pool.query<IStudent>(
      `UPDATE students 
       SET last_name = COALESCE($1, last_name), 
           first_name = COALESCE($2, first_name), 
           email = COALESCE($3, email), 
           age = COALESCE($4, age) 
       WHERE id = $5 RETURNING *`,
      [lastName, firstName, email, age, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM students WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}