import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/role.enum';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UsersService {

    private readonly users: UserEntity[] = [
        {
            id: 1,
            name: 'John',
            password: 'test',
            roles: [Role.Admin, Role.User],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            name: 'Maria',
            password: 'guess',
            roles: [Role.User],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    async findOne(name: string): Promise<UserEntity | undefined> {
        return this.users.find(user => user.name === name);
    }
}
