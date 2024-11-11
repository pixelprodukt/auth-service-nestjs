import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    // in the post request body, it has to be named 'username' even though it's an email. 
    // Otherwise, passport won't parse the credentials.
    public async validate(email: string, password: string): Promise<any> {

        const user = await this.authService.validateUser(email, password);
        
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}