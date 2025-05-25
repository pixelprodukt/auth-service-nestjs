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

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('TOKEN_SECRET'),
                signOptions: { 
                    expiresIn: configService.get<string>('TOKEN_EXPIRATION') || '3600s'
                }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy, JwtAuthGuard, LocalStrategy],
    exports: [JwtAuthGuard]
})
export class AuthModule { }
