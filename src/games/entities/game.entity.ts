import { ApiProperty } from "@nestjs/swagger";
import { GamePlatform } from "src/game-platforms/entities/game-platform.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('games')
@Unique(['name', 'steamAppId'])
export class Game {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Nombre del juego',
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
        type: 'text',
        nullable: true,
    })
    cover?: string;

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

    @Column({
        type: 'int',
        nullable: true,
    })
    @ApiProperty({
        description: 'Identificador de la aplicación en Steam',
        example: 292030,
        required: false,
    })
    steamAppId?: number;

    @OneToMany(() => GamePlatform, gamePlatform => gamePlatform.game)
    gamePlatforms: GamePlatform[];

}
