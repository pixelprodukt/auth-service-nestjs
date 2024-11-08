import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { SignUpDto } from '../models/sign-up.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SignInDto } from '../models/sign-in.dto';
import { UserEntity } from '../entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    public signIn(@Request() req) {
        console.log('request user: ', req.user);
        return this.authService.signIn(req.user);
    }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('sign-up')
    public register(@Body() signUpDto: SignUpDto): String {
        return `You successfully registered with username: ${signUpDto.username} and password: ${signUpDto.password}`;
    }

    // just for testing purpose
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('profile')
    public getProfile(@Request() req) {
        return req.user;
    }
}
