import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { User, UserDocument } from '../mongo/schema/users';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * 
   * @param id 
   */
  async findUserById(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
  }

  /**
   * 
   * @param user 
   */
  async validateUser(user: User): Promise<any> {
    const findUser = await this.userModel.findOne({ username: user.username });
    if (!findUser) return null;
    const isMatch = await bcrypt.compare(user.password, findUser.password);
    if (isMatch)
      return findUser;
    return null;
  }

  /**
   * 
   * @param user 
   */
  async register(user: User): Promise<User> {
    const saltOrRounds = 10;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.userModel.create({ ...user, password: hash });
  }

  async getAll() {
    const users = await this.userModel.find({});
    console.log("ss", users);
    return users;
  }
}
