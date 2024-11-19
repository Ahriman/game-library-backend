import { Game } from "src/games/entities/game.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_games')
export class UserGame {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User) // , user => user.userGames
    user: User;

    @ManyToOne(() => Game) // , game => game.userGames
    game: Game;

    // @Column()
    // score: number;

}
