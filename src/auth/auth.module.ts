import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AccessTokenStrategy } from './access-token.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenStrategy } from './refresh-token.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.tokenSecret,
            signOptions: { expiresIn: '240s' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy, JwtAuthGuard, LocalStrategy],
    exports: [JwtAuthGuard]
})
export class AuthModule { }
