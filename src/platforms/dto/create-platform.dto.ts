import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePlatformDto {

    @ApiProperty({
        description: 'Nombre de la plataforma',
        example: 'PlayStation 5',
        minLength: 3,
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    name: string;
    
}
