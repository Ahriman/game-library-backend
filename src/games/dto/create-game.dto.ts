import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateGameDto {

    @ApiProperty({
        description: 'Título del juego',
        example: 'The Legend of Zelda: Breath of the Wild',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'URL de la portada del juego',
        example: 'https://example.com/covers/zelda.jpg',
    })
    @IsString()
    cover: string;

    @ApiPropertyOptional({
        description: 'Descripción del juego',
        example: 'Un juego de aventuras en mundo abierto desarrollado por Nintendo.',
    })
    @IsString()
    @IsOptional()
    description?: string;
    
}
