import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';


@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>){}

  private sanitizeUser(user: User) {
    return user.depopulate('password');
  }
}
