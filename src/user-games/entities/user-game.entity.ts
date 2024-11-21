import { ApiProperty } from "@nestjs/swagger";
import { Game } from "src/games/entities/game.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_games')
export class UserGame {

    @ApiProperty({
        description: 'The unique identifier for the UserGame entity.',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @ApiProperty({
    //     description: 'The user associated with this UserGame entity.',
    //     type: () => User
    // })
    // // @ManyToOne(() => User) // , user => user.userGames
    // user: User;

    // @ApiProperty({
    //     description: 'The game associated with this UserGame entity.',
    //     type: () => Game
    // })
    // @ManyToOne(() => Game) // , game => game.userGames
    // game: Game;

    @Column()
    userId: string;

    @Column()
    gameId: string;

    // @ApiProperty({
    //     description: 'The score of the user in the game.',
    //     example: 100,
    //     required: false
    // })
    // @Column()
    // score: number;

}
