import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from '../models/sign-in.dto';
import { SignUpDto } from '../models/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    public signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-up')
    public register(@Body() signUpDto: SignUpDto): String {
        return `You successfully registered with username: ${signUpDto.username} and password: ${signUpDto.password}`;
    }
}
