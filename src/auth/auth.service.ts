import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from '../models/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    public async signIn(user): Promise<{ access_token: string }> {
        /* const user = await this.usersService.findOne(signInDto.username);

        if (!user) {
            throw new UnauthorizedException();
        } */

        const payload = { username: user.name, sub: user.id };
        console.log('payload: ', payload);
        console.log('token: ', this.jwtService.sign(payload));
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public async validateUser(email: string, password: string): Promise<any | null> {
        
        const user = await this.usersService.findOneByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (user && isMatch) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }
}
