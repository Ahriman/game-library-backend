import { Injectable } from '@nestjs/common';
import { CreateGamePlatformDto } from './dto/create-game-platform.dto';
import { UpdateGamePlatformDto } from './dto/update-game-platform.dto';

@Injectable()
export class GamePlatformsService {
  create(createGamePlatformDto: CreateGamePlatformDto) {
    return 'This action adds a new gamePlatform';
  }

  findAll() {
    return `This action returns all gamePlatforms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gamePlatform`;
  }

  update(id: number, updateGamePlatformDto: UpdateGamePlatformDto) {
    return `This action updates a #${id} gamePlatform`;
  }

  remove(id: number) {
    return `This action removes a #${id} gamePlatform`;
  }
}
