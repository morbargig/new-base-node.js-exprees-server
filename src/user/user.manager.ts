import { UserNotFoundError, InValidPassword } from '../utils/errors/applicationError';
import { User } from './user.interface';
import { UserRepository } from './user.repository';
import { LoginContext, AuthorizationEntity, RegisterContext } from '../auth/auth.interfaces';
import { compare, hash, genSalt } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../config';

export class UserManager {

  static genUserToken = (_item) => {
    // generate new token with my secret 
    const token = sign(_item, config.auth.secretToken);
    return token;
  }

  static async register(registerData: RegisterContext) {
    const salt = await genSalt(10);
    // password encryption
    registerData.pass = await hash(registerData.pass, salt);
    let user = await UserRepository.register(registerData) as User
    if (!user) throw new UserNotFoundError();
    let newToken = UserManager.genUserToken({ _id: user._id, employId: user.employId });
    // TODO add refresh token 
    let expiresDate: Date = new Date()
    expiresDate.setFullYear(new Date().getFullYear() + 1)
    let authObj: AuthorizationEntity = {
      employId: user.employId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      authorized: true,
      expiresIn: expiresDate,
      accessToken: newToken,
      admin: user?.role ? ('admin' in user?.role || 'ADMIN' in user?.role) : null,
    }
    return authObj
  }

  static async login(loginData: LoginContext) {
    let user = await UserManager.getByEmployId(loginData.employId) as User
    if (!user) throw new UserNotFoundError();
    // check user password, with coming encrypted password
    let validPass = await compare(loginData.pass, user.pass)
    // wrong password
    if (!validPass) throw new InValidPassword()
    // return generated token
    let newToken = UserManager.genUserToken({ _id: user._id, employId: user.employId });
    // TODO add refresh token 
    let expiresDate: Date = new Date()
    expiresDate.setFullYear(new Date().getFullYear() + 1)
    let authObj: AuthorizationEntity = {
      employId: user.employId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      authorized: true,
      expiresIn: expiresDate,
      accessToken: newToken,
      admin: 'admin' in user?.role || 'ADMIN' in user?.role,
    }
    return authObj
  }

  static async getByEmployId(id: number) {
    const user = await UserRepository.getByEmployId(id);
    if (!user) throw new UserNotFoundError();
    return user;
  }



  static async getById(id: string) {
    const user = await UserRepository.getById(id);
    if (!user) throw new UserNotFoundError();
    return user;
  }

  // static getMany(
  //   startIndex: number,
  //   endIndex: number,
  //   userFields: Partial<User>,
  //   minCreationDate?: Date,
  //   maxCreationDate?: Date,
  //   minUpdateDate?: Date,
  //   maxUpdateDate?: Date,
  //   search?: string,
  // ) {
  //   return UserRepository.getMany(
  //     startIndex,
  //     endIndex,
  //     userFields,
  //     minCreationDate,
  //     maxCreationDate,
  //     minUpdateDate,
  //     maxUpdateDate,
  //     search,
  //   );
  // }

  // static async update(id: string, userFields: Partial<User>) {
  //   const user = await UserRepository.update(id, userFields);
  //   if (!user) throw new UserNotFoundError();

  //   return user;
  // }

  // static async delete(id: string) {
  //   const user = await UserRepository.delete(id);
  //   if (!user) throw new UserNotFoundError();

  //   return user;
  // }
}
