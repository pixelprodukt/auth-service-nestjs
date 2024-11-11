import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenResponse } from '../models/response/token.response';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    public async signIn(user): Promise<TokenResponse> {

        const payload = { username: user.email, sub: user.id };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    public async validateUser(email: string, password: string): Promise<any | null> {
        
        const user = await this.usersService.findOneByEmail(email);
        const isMatch = await bcrypt.compare(password, user?.password);
        
        if (user && isMatch) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }
}
