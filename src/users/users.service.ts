import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}

    /* private readonly users: UserEntity[] = [
        {
            id: '1',
            name: 'John',
            email: 'john@example.com',
            password: 'test',
            roles: [Role.Admin, Role.User],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            name: 'Maria',
            email: 'maria@example.com',
            password: 'guess',
            roles: [Role.User],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]; */

    async findOneByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findOneBy({ email });
    }
}
