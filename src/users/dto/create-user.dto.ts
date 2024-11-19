import { IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Status } from "../enums/status.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        example: 'user@example.com',
        description: 'Email del usuario',
    })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({
        example: 'username123',
        description: 'Nombre de usuario (opcional)',
    })
    @IsString()
    @IsOptional()
    @Length(3, 50)
    username?: string;

    @ApiProperty({
        example: 'password123',
        description: 'Contraseña del usuario',
        minLength: 6,
        maxLength: 100,
    })
    @IsString()
    @Length(6, 100)
    password: string;

    @ApiPropertyOptional({
        example: 'John',
        description: 'Nombre del usuario (opcional)',
    })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    first_name?: string;

    @ApiPropertyOptional({
        example: 'Doe',
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

    // Aquí no es necesario incluir `created_at` y `updated_at` ya que son gestionados automáticamente por TypeORM.
    
}