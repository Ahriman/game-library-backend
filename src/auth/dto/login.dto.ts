import { IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Status } from "src/users/enums/status.enum";


export class RegisterDto {

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @Length(3, 50)
    username?: string;

    @IsString()
    @Length(6, 100)
    password: string;

}