import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from 'src/types/user';
import {RegisterDTO} from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';
import {LoginDto} from '../auth/login.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {

    }

    private sanitizeUser(user: User) {
        return user.depopulate('password');
    }

    async create(userDto: RegisterDTO) {
        const {userName} = userDto;
        const user = await this.userModel.findOne({userName});
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(userDto);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByLogin(userDto: LoginDto) {
        const {userName, password} = userDto;
        const user = await this.userModel.findOne({userName});
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

    }

    async findByPayload(payload: any) {
        const {userName} = payload;
        return await this.userModel.findOne({userName});
    }

    async findAll() {
        return await this.userModel.find().exec();
    }
}
