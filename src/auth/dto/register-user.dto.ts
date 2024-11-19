import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";
import { Status } from "src/users/enums/status.enum";


export class RegisterUserDto {

    @ApiProperty({
        example: 'usuario@ejemplo.com',
        description: 'Email del usuario',
    })
    @Transform(({ value }) => value.toLowerCase())
    @IsEmail()
    email: string;

    @ApiPropertyOptional({
        example: 'nombredeusuario123',
        description: 'Nombre de usuario (opcional)',
    })
    @IsString()
    @IsOptional()
    @Length(3, 50)
    username?: string;

    @ApiProperty({
        example: 'contraseña123',
        description: 'Contraseña del usuario',
        minLength: 6,
        maxLength: 100,
    })
    @Transform(({ value }) => value.trim()) // TODO
    @IsString()
    @Length(6, 100)
    @IsStrongPassword() // En el CreateUserDto no tenemos esto, es un ejemplo de por qué no deben ser iguales, uno puede ser más estricto que el otro
    password: string;

    @ApiPropertyOptional({
        example: 'Juan',
        description: 'Nombre del usuario (opcional)',
    })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    first_name?: string;

    @ApiPropertyOptional({
        example: 'Pérez',
        description: 'Apellido del usuario (opcional)',
    })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    last_name?: string;

    @ApiPropertyOptional({
        example: Status.ACTIVE,
        description: 'Estado del usuario',
        enum: Status,
        default: Status.ACTIVE,
    })
    @IsEnum(Status)
    status?: Status = Status.ACTIVE;

}