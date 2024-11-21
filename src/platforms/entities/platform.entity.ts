import { ApiProperty } from "@nestjs/swagger";
import { GamePlatform } from "src/game-platforms/entities/game-platform.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Platform {

    @ApiProperty({
        description: 'UUID de la plataforma',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Nombre de la plataforma',
        example: 'PlayStation 5',
    })
    @Column({ unique: true })
    name: string;

    @ApiProperty({
        description: 'Lista de relaciones con GamePlatform',
        type: () => [GamePlatform],
    })
    @OneToMany(() => GamePlatform, gamePlatform => gamePlatform.platform)
    gamePlatforms: GamePlatform[];

}
