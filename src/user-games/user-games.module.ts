import { Module } from '@nestjs/common';
import { UserGamesService } from './user-games.service';
import { UserGamesController } from './user-games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGame } from './entities/user-game.entity';
import { User } from 'src/users/entities/user.entity';
import { Game } from 'src/games/entities/game.entity';
import { UsersModule } from 'src/users/users.module';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGame, User, Game]),
    UsersModule,
    GamesModule,
  ],
  controllers: [UserGamesController],
  providers: [UserGamesService],
  exports: [UserGamesService],
})
export class UserGamesModule {}
