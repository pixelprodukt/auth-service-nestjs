import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenResponse } from '../models/response/token.response';
import { UserDto } from '../models/dtos/user.dto';
import { User } from '../models/domain/user';
import { UserEntity } from '../entities/user.entity';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    public async signIn(user: User): Promise<TokenResponse> {
        const payload = { username: user.email, sub: user.id };

        const tokens = await this.getTokens(user.id, user.email);
        return tokens;
        /* return {
            accessToken: this.jwtService.sign(payload),
        }; */
    }

    public async validateUser(email: string, password: string): Promise<User | null> {
        try {
            const user: UserEntity = await this.usersService.findOneByEmail(email);
            const isMatch = await bcrypt.compare(password, user?.password);

            if (user && isMatch) {
                const { password, ...result } = user;
                return {
                    id: result.id,
                    email: result.email,
                    name: result.name
                };
            }
        } catch (err: unknown) {
            throw new UnauthorizedException('Something went wrong while trying to sign-in.');
        }

        return null;
    }

    async getTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: jwtConstants.secret,
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: jwtConstants.refreshSecret,
                    expiresIn: '7d',
                },
            )
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
