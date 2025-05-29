import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './access-token.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenStrategy } from './refresh-token.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { WellKnownController } from './well-known.controller';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                privateKey: fs.readFileSync(configService.get('JWT_ACCESS_TOKEN_PRIVATE_KEY_PATH'), 'utf8'),
                publicKey: fs.readFileSync(configService.get('JWT_ACCESS_TOKEN_PUBLIC_KEY_PATH'), 'utf8'),
                signOptions: { 
                    expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION') || '3600s',
                    algorithm: 'RS256'
                }
            })
        })
    ],
    controllers: [AuthController, WellKnownController],
    providers: [AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy, JwtAuthGuard, LocalStrategy],
    exports: [JwtAuthGuard]
})
export class AuthModule { }
