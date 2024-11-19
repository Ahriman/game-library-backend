import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('games')
@Unique(['name', 'steamAppId'])
export class Game {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Título del juego',
        example: 'The Witcher 3: Wild Hunt',
    })
    @Column('text', {
        // unique: true
    })
    name: string;

    @ApiProperty({
        description: 'URL de la portada del juego',
        example: 'https://example.com/covers/witcher3.jpg',
    })
    @Column({
        type: 'text'
    })
    cover: string;

    @Column({
        type: 'text',
        nullable: true
    })
    @ApiProperty({
        description: 'Descripción del juego',
        example: 'Un juego de rol aclamado por la crítica basado en la saga de Geralt de Rivia.',
        required: false,
    })
    description?: string;

    @Column('int')
    @ApiProperty({
        description: 'Identificador de la aplicación en Steam',
        example: 292030,
        required: false,
    })
    steamAppId?: number;

}
