import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';

@Module({
    imports: [
        AuthModule, 
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'admin',
            database: 'auth-database',
            entities: [UserEntity, RoleEntity],
            // synchronize: true,
            // autoLoadEntities: true,
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
