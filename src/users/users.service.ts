import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/models/dtos/sign-up.dto';
import { UserAlreadyExistsException } from 'src/exceptions/user-already-exits.exception';
import { RoleEntity } from 'src/entities/role.entity';

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
        const alreadyExistingUser = this.usersRepository.findOneBy({ email: newUser.username });
        if (alreadyExistingUser) {
            throw new UserAlreadyExistsException();
        }
        this.usersRepository.create(newUser)
    }
}
