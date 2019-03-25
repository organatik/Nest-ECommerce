import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UserService} from '../shared/user.service';
import {LoginDto, RegisterDTO} from './auth.dto';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {Payload} from '../types/payload';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    tempAuth() {
        return { auth: 'works' };
    }

    @Post('login')
    async login(@Body() userDTO: LoginDto) {
        const user = await this.userService.findByLogin(userDTO);
        const payload: Payload = {
            userName: user.userName,
            seller: user.seller,
        };

        const token = await this.authService.signPayload(payload);
        return {user, token};
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO) {
        const user = await this.userService.create(userDTO);
        const payload: Payload = {
            userName: user.userName,
            seller: user.seller,
        };

        const token = await this.authService.signPayload(payload);
        return {user, token};
    }
}
