import { User } from './user.interface';
import { UserModel } from './user.model';
import { RegisterContext } from '../auth/auth.interfaces';

export class UserRepository {
  static register(User: RegisterContext) {
    return UserModel.create(User);
  }

  static getById(id: string) {
    return UserModel.findById(id);
  }

  static getByEmployId(id: number) {
    return UserModel.findOne({ employId: id })
  }

  // static getMany(
  //   startIndex: number,
  //   endIndex: number,
  //   UserFields: Partial<User>,
  //   minCreationDate?: Date,
  //   maxCreationDate?: Date,
  //   minUpdateDate?: Date,
  //   maxUpdateDate?: Date,
  //   search?: string,
  // ) {
  //   const dateFilter = UserRepository.setDateFilters(
  //     minCreationDate,
  //     maxCreationDate,
  //     minUpdateDate,
  //     maxUpdateDate,
  //   );

  //   const searchFilter = search ? [{ name: { $regex: `${search}`, $options: 'im' } }] : [];

  //   const filterArray: any[] = [UserFields, ...dateFilter, ...searchFilter];

  //   return UserModel.find({
  //     $and: [...filterArray],
  //   })
  //     .skip(startIndex)
  //     .limit(endIndex - startIndex)
  //     .exec();
  // }

  // static update(id: string, User: Partial<User>) {
  //   return UserModel.findByIdAndUpdate(id, User, { new: true }).exec();
  // }

  // static delete(id: string) {
  //   return UserModel.findByIdAndDelete(id).exec();
  // }

  // private static setDateFilters(
  //   minCreationDate?: Date,
  //   maxCreationDate?: Date,
  //   minUpdateDate?: Date,
  //   maxUpdateDate?: Date,
  // ) {
  //   const dateFilter = [];
  //   const creationDate: { $gte?: Date; $lt?: Date } = {};
  //   const updateDate: { $gte?: Date; $lt?: Date } = {};

  //   if (minCreationDate) creationDate.$gte = minCreationDate;
  //   if (maxCreationDate) creationDate.$lt = maxCreationDate;
  //   if (minUpdateDate) updateDate.$gte = minUpdateDate;
  //   if (maxUpdateDate) updateDate.$lt = maxUpdateDate;
  //   if (creationDate.$gte || creationDate.$lt) dateFilter.push({ creationDate });
  //   if (updateDate.$gte || updateDate.$lt) dateFilter.push({ updateDate });

  //   return dateFilter;
  // }
}
