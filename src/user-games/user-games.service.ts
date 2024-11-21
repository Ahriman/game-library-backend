import { Injectable } from '@nestjs/common';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { UpdateUserGameDto } from './dto/update-user-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGame } from './entities/user-game.entity';
import { User } from 'src/users/entities/user.entity';
import { GamesService } from 'src/games/games.service';
import { Game } from 'src/games/entities/game.entity';

@Injectable()
export class UserGamesService {

  constructor(
    @InjectRepository(UserGame)
    private readonly userGameRepository: Repository<UserGame>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly gamesService: GamesService,
  ) {}
  
  create(createUserGameDto: CreateUserGameDto) {
    return 'This action adds a new userGame';
  }

  findAll() {
    return `This action returns all userGames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userGame`;
  }

  update(id: number, updateUserGameDto: UpdateUserGameDto) {
    return `This action updates a #${id} userGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} userGame`;
  }



  async addUserGame(userId: string, gameData: Partial<Game>): Promise<UserGame> {
    // Buscar o crear el juego
    const game = await this.gamesService.findOrCreate(gameData);

    // Verificar si el usuario existe
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId }, // Busca el usuario por su ID
    });

    // Verificar si ya existe la relación usuario-juego
    const existingRelation = await this.userGameRepository.findOne({
      where: { userId: user.id, gameId: game.id },
    });

    if (existingRelation) {
      throw new Error('El usuario ya tiene este juego en su lista');
    }

    // Crear la relación usuario-juego
    const userGame = this.userGameRepository.create({ userId: user.id, gameId: game.id });
    return this.userGameRepository.save(userGame);
  }
  
}
