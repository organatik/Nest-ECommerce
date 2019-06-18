import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from '../shared/user.service';
import {RegisterDTO} from './auth.dto';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {Payload} from '../types/payload';
import {User} from '../utilities/user.decorator';
import {SellerGuard} from '../guards/seller.guard';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import {LoginDto} from './login.dto';


@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) {
    }


    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async findAll(@User() user: any) {
        return await this.userService.findAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }))
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
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }))
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
