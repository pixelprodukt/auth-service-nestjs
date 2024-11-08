import { Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('users')
export class UsersController {

    constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    public getUsers(): Promise<UserEntity[]|null> {
        return this.usersRepository.find({ relations: {roles: true }});
    }

    @HttpCode(HttpStatus.OK)
    @Get('id')
    public getUserById(@Param() id: string): Promise<UserEntity|null> {
        return this.usersRepository.findOneBy({ id });
    }
}