import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    public async signIn(user: any): Promise<{ access_token: string }> {
        const payload = { username: user.username, sub: user.userId };
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
