import { IsEmail, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    fullname?: string;
}