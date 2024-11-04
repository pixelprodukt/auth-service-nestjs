import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/users.service';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';

interface RegisterDto {
    username: string;
    password: string;
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    public signIn(@Body() signInDto: Record<string, any>): Promise<{ access_token: string }> {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    public getProfile(@Request() request): Promise<User> {
        return request.user;
    }

    @Post('register')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    public register(@Body() registerDto: RegisterDto): String {
        return `You successfully registered with username: ${registerDto.username} and password: ${registerDto.password}`;
    }
}
