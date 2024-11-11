import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { SignUpDto } from '../models/dtos/sign-up.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { SignUpRequest } from 'src/models/requests/sign-up.request';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    public signIn(@Request() req) {
        console.log('request user: ', req.user);
        return this.authService.signIn(req.user);
    }

    //@UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('sign-up')
    public signUp(@Body() signUpRequest: SignUpRequest): void {
        const signUpDto: SignUpDto = {...signUpRequest};
        const newUser = this.userService.signUp(signUpDto);
    }

    // just for testing purpose
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('profile')
    public getProfile(@Request() req) {
        return req.user;
    }
}
