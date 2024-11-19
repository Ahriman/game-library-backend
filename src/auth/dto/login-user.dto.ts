import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class LoginUserDto {

    @ApiProperty({
        example: 'usuario@ejemplo.com',
        description: 'Email del usuario',
    })
    @IsEmail()
    email: string;

    // TODO: Implementar el inicio de sesión con usuario
    // @IsString()
    // @IsOptional()
    // @Length(3, 50)
    // username?: string;

    @ApiProperty({
        example: 'contraseña123',
        description: 'Contraseña del usuario',
        minLength: 6,
        maxLength: 100,
    })
    @IsString()
    @Length(6, 100)
    password: string;

}