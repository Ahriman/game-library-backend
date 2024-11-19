import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateGameDto {

    @ApiProperty({
        example: 'The Legend of Zelda: Breath of the Wild',
        description: 'Título del juego',
    })
    @IsString()
    title: string;

    @ApiProperty({
        example: 'https://example.com/covers/zelda.jpg',
        description: 'URL de la portada del juego',
    })
    @IsString()
    cover: string;

    @ApiPropertyOptional({
        example: 'Un juego de acción y aventura en un mundo abierto.',
        description: 'Descripción del juego (opcional)',
    })
    @IsString()
    @IsOptional()
    description?: string;
    
}
