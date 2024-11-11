import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { SignUpDto } from 'src/models/dtos/sign-up.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity) private readonly rolesRepository: Repository<RoleEntity>
    ) {}

    public async findOneByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findOneBy({ email });
    }

    public async signUp(newUser: SignUpDto) {
        
        const alreadyExistingUser = await this.usersRepository.findOneBy({ email: newUser.username });
        console.log('alreadyExistingUser', alreadyExistingUser);
        
        if (alreadyExistingUser) {
            throw new Error('User already exists');
        }

        const roles = await this.rolesRepository.find();
        console.log('roles', roles);
        
        // const newCreatedUser = this.usersRepository.create(newUser);
    }
}
