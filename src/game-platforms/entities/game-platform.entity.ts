import { Game } from "src/games/entities/game.entity";
import { Platform } from "src/platforms/entities/platform.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('game_platforms')
export class GamePlatform {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Game) // , game => game.gamePlatforms
    game: Game;

    @ManyToOne(() => Platform) // , platform => platform.gamePlatforms
    platform: Platform;

    @Column({ nullable: true })
    externalId: string;

    // @Column({ type: 'date', nullable: true })
    // releaseDate: Date;

}
