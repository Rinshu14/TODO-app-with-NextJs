// types/express.d.ts

// src/types/express.d.ts
import { User } from './User' // or wherever your User type is defined

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};

