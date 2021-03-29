import { RegisterContext } from '../auth/auth.interfaces';
export interface User extends RegisterContext {
  role?: UserRoles[],
  _id?: number,
}

export interface UserRoles {
  admin: 'ADMIN',
  regular: 'REGULAR'
}