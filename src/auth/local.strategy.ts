import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    public async validate(username: string, password: string): Promise<any> {
        console.log('username: ', username);
        console.log('password: ', password);
        const user = await this.authService.validateUser(username, password);
        console.log('user from validate: ', user);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}