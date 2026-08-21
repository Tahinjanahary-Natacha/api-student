import { StudentRepository } from '../Repository/studentRepository';
import { IStudent } from '../Models/student';

export class StudentService {
  private studentRepo: StudentRepository;

  constructor() {
    this.studentRepo = new StudentRepository();
  }

  async getAll(): Promise<IStudent[]> {
    return await this.studentRepo.findAll();
  }

  async getById(id: number): Promise<IStudent | null> {
    return await this.studentRepo.findById(id);
  }

  async create(data: IStudent): Promise<IStudent> {
    if (!data.lastName || !data.firstName || !data.email || data.age === undefined) {
      throw new Error('Required fields missing: lastName, firstName, email, age');
    }
    return await this.studentRepo.create(data);
  }

  async update(id: number, data: Partial<IStudent>): Promise<IStudent | null> {
    return await this.studentRepo.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return await this.studentRepo.delete(id);
  }
}