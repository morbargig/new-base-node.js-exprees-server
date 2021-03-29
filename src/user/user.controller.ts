import { Request, Response } from 'express';
import { User } from './user.interface';
import { UserManager } from './user.manager';
import { LoginContext } from '../auth/auth.interfaces';

export class UserController {
  static async register(req: Request, res: Response) {
    res.json(await UserManager.register(req.body));
  }

  static async login(req: Request, res: Response) {
    res.json(await UserManager.login(req.body))
  }

  static async get(req: Request, res: Response) {
    res.json(await UserManager.getById(req.params.id));
  }

  // static async getMany(req: Request, res: Response) {
  //   type QueryType = {
  //     startIndex: number;
  //     endIndex: number;
  //     search?: string;
  //     minCreationDate?: Date;
  //     maxCreationDate?: Date;
  //     minUpdateDate?: Date;
  //     maxUpdateDate?: Date;
  //   };

  //   const query = (req.query as unknown) as QueryType & Partial<User>;

  //   const {
  //     startIndex,
  //     endIndex,
  //     minCreationDate,
  //     maxCreationDate,
  //     minUpdateDate,
  //     maxUpdateDate,
  //     search,
  //     ...userFields
  //   } = query;

  //   res.json(
  //     await UserManager.getMany(
  //       startIndex,
  //       endIndex,
  //       userFields,
  //       minCreationDate,
  //       maxCreationDate,
  //       minUpdateDate,
  //       maxUpdateDate,
  //       search,
  //     ),
  //   );
  // }

  // static async update(req: Request, res: Response) {
  //   res.json(await UserManager.update(req.params.id, req.body));
  // }

  // static async delete(req: Request, res: Response) {
  //   res.json(await UserManager.delete(req.params.id));
  // }
}
