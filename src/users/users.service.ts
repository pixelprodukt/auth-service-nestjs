import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { SignUpDto } from 'src/models/dtos/sign-up.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAlreadyExistsException } from '../exceptions/user-already-exits.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity) private readonly rolesRepository: Repository<RoleEntity>
    ) {}

    public async findOneByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findOneBy({ email });
    }

    public async signUp(signUpDto: SignUpDto): Promise<void> {
        
        const alreadyExistingUser = await this.usersRepository.findOneBy({ email: signUpDto.username });
        
        if (alreadyExistingUser) {
            throw new UserAlreadyExistsException();
        }

        const roles = await this.rolesRepository.find();

        const userEntity: UserEntity = new UserEntity();
        userEntity.email = signUpDto.username;
        userEntity.password = await bcrypt.hash(signUpDto.password, 10);
        userEntity.roles = [roles.find(role => role.name === 'USER')];
        
        this.usersRepository.save(userEntity);
    }
}
