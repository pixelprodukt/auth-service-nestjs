import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from '../models/sign-in.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    public async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(signInDto.username);

        if (!user) {
            throw new UnauthorizedException();
        }

        const payload = { username: user.name, sub: user.id };
        console.log('payload: ', payload);
        console.log('token: ', this.jwtService.sign(payload));
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public async validateUser(username: string, password: string): Promise<any | null> {
        const user = await this.usersService.findOne(username);

        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }
}
