import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";
import { Status } from "src/users/enums/status.enum";


export class RegisterUserDto {

    @Transform(({ value }) => value.toLowerCase())
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @Length(3, 50)
    username?: string;

    @Transform(({ value }) => value.trim()) // TODO
    @IsString()
    @Length(6, 100)
    @IsStrongPassword() // En el CreateUserDto no tenemos esto, es un ejemplo de por qué no deben ser iguales, uno puede ser más estricto que el otro
    password: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    first_name?: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    last_name?: string;

    @IsEnum(Status)
    status?: Status = Status.ACTIVE;

}