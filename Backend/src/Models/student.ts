import { pool } from '../config/db';

export interface IStudent {
  id?: number;
  lastName: string;
  firstName: string;
  email: string;
  age: number;
}