import { Role } from '../roles/role.enum';

export interface UserEntity {
    id: number;
    name: string;
    password: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}