import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {

  private readonly logger = new Logger('GamesService');

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto) {

    try {

      const game = this.gameRepository.create(createGameDto);
      await this.gameRepository.save( game );

      return game;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  // TODO: Paginar
  findAll() {
    return this.gameRepository.find({});
  }

  async findOne(id: string) {

    const game = await this.gameRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }

    return game;
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
