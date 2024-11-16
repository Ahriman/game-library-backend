import { IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Status } from "../enums/status.enum";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @Length(3, 50)
    username?: string;

    @IsString()
    @Length(6, 100)
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

    // Aquí no es necesario incluir `created_at` y `updated_at` ya que son gestionados automáticamente por TypeORM.
    
}