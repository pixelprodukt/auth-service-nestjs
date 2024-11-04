import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/role.enum';

export interface User {
    id: number;
    name: string;
    password: string;
    roles: Role[];
}

@Injectable()
export class UsersService {

    private readonly users: User[] = [
        {
            id: 1,
            name: 'John',
            password: 'test',
            roles: [Role.Admin, Role.User]
        },
        {
            id: 2,
            name: 'Maria',
            password: 'guess',
            roles: [Role.User]
        }
    ];

    async findOne(name: string): Promise<User | undefined> {
        return this.users.find(user => user.name === name);
    }
}
