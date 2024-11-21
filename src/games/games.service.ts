import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, ILike, Like, Repository } from 'typeorm';

import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Game } from './entities/game.entity';
import { SteamGame } from 'src/steam/interfaces/steam.game';

@Injectable()
export class GamesService {

  private readonly logger = new Logger('GamesService');

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}
  
  async findOrCreate(gameData: Partial<Game>): Promise<Game> {
    let game = await this.gameRepository.findOne({ where: { name: gameData.name } });

    if (!game) {
      game = this.gameRepository.create(gameData);
      return this.gameRepository.save(game);
    }

    return game;
  }
  
  async create(createGameDto: CreateGameDto) {

    try {

      const game = this.gameRepository.create(createGameDto);
      await this.gameRepository.save( game );

      return game;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  // async createBulk(games: Partial<Game>[]) {
  //   // return this.gameRepository.save(games);
  //   const manager = getManager();
  //   await manager.query(`
  //     INSERT INTO game (title, cover, description)
  //     VALUES ${games.map(game => `('${game.title}', '${game.cover}', '${game.description || ''}')`).join(', ')}
  //     ON CONFLICT (title) DO NOTHING
  //   `);
  // }

  // async createBulk(games: Partial<Game>[]): Promise<void> {
  //   try {
  //     await this.gameRepository.save(games, { chunk: 100 });
  //   } catch (error) {
  //     // Maneja errores aquí
  //     console.error('Error guardando juegos:', error);
  //   }
  // }

  async createBulk(games: Partial<Game>[]): Promise<void> {
    try {
      await this.gameRepository.save(games, { chunk: 100 }); // Inserta en bloques de 100
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // async createBulk(steamGames: SteamGame[]): Promise<void> {
  //   try {
  //     // Mapear SteamGame a Game
  //     const gamesToSave: Partial<Game>[] = steamGames.map(sg => ({
  //       title: sg.name,
  //       cover: `https://steamcdn-a.akamaihd.net/steam/apps/${sg.appid}/header.jpg`,
  //       description: '', // Aquí puedes incluir lógica específica para "description"
  //     }));

  //     // Filtrar juegos con títulos únicos
  //     const seenTitles = new Set();
  //     const uniqueGames = gamesToSave.filter(game => {
  //       if (seenTitles.has(game.title)) {
  //         return false;
  //       }
  //       seenTitles.add(game.title);
  //       return true;
  //     });

  //     // Guarda los juegos en la base de datos
  //     await this.gameRepository.save(uniqueGames, { chunk: 100 });
  //   } catch (error) {
  //     // Maneja errores aquí
  //     this.handleDBExceptions(error);
  //   }
  // }

  findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.gameRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    });
  }

  async findOne(id: string) {

    const game = await this.gameRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }

    return game;
  }

  async searchByName(name: string): Promise<Game[]> {
    return this.gameRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  async remove(id: string) {

    const game = await this.findOne(id);

    await this.gameRepository.delete(game.id);
  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}
