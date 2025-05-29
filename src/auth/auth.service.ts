import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenResponse } from '../models/response/token.response';
import { User } from '../models/domain/user';
import { UserEntity } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    public async signIn(user: User): Promise<TokenResponse> {
        const payload = { username: user.email, sub: user.id };

        const tokens = await this.getTokens(user.id, user.email);
        return tokens;
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
                    privateKey: fs.readFileSync(this.configService.get('JWT_ACCESS_TOKEN_PRIVATE_KEY_PATH'), 'utf8'),
                    expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
                    keyid: 'access_token'
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    privateKey: fs.readFileSync(this.configService.get('JWT_REFRESH_TOKEN_PRIVATE_KEY_PATH'), 'utf8'),
                    expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
                    keyid: 'refresh_token'
                },
            )
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
