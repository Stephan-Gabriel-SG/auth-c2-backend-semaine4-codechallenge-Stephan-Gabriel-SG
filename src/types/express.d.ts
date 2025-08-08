import { UserPayload } from 'src/users/interfaces/user.interface';

declare module 'express' {
  export interface Request {
    user: UserPayload;
  }
}
