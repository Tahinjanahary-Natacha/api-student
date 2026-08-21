import bcrypt from 'bcryptjs';
import { UserRepository } from '../Repository/userRepository';
import { IUser } from '../Models/user';
import { generateToken } from '../security/jwtUtils';

export class AuthService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async register(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepo.create({ email, password: hashedPassword });

    const token = generateToken({ id: newUser.id!, email: newUser.email });
    return { user: newUser, token };
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.password) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken({ id: user.id!, email: user.email });
    delete user.password; // Sécurité : masquer le hash dans la réponse

    return { user, token };
  }
}