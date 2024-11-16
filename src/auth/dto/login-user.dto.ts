import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    email: string;

    // TODO: Implementar el inicio de sesión con usuario
    // @IsString()
    // @IsOptional()
    // @Length(3, 50)
    // username?: string;

    @IsString()
    @Length(6, 100)
    password: string;

}