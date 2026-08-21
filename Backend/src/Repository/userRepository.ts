import { pool } from '../config/db';
import { IUser } from '../Models/user';

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    const result = await pool.query<IUser>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async create(user: IUser): Promise<IUser> {
    const { email, password } = user;
    const result = await pool.query<IUser>(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, password]
    );
    return result.rows[0];
  }
}