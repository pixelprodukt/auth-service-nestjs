import { HttpException } from "@nestjs/common";

export class UserAlreadyExistsException extends Error {
    name = 'UserAlreadyExistsException';
    message = 'A user with this email already exists.';
}