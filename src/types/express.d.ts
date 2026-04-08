import { IUser } from './user';


declare module 'express-session' {
  interface SessionData {
    user?: IUser | null;
    isAuthenticated: boolean;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
      csrfToken(): string;
    }
  }
}