import jwt, { SignOptions } from 'jsonwebtoken';

interface UserPayload {
  id: number;
  email: string;
}

export const generateToken = (payload: UserPayload): string => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  const expiresIn = (process.env.JWT_EXPIRES_IN || '24h') as SignOptions['expiresIn'];

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string): UserPayload => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  return jwt.verify(token, secret) as UserPayload;
};