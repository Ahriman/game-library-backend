import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamePlatformsService } from './game-platforms.service';
import { CreateGamePlatformDto } from './dto/create-game-platform.dto';
import { UpdateGamePlatformDto } from './dto/update-game-platform.dto';

@Controller('game-platforms')
export class GamePlatformsController {
  constructor(private readonly gamePlatformsService: GamePlatformsService) {}

  @Post()
  create(@Body() createGamePlatformDto: CreateGamePlatformDto) {
    return this.gamePlatformsService.create(createGamePlatformDto);
  }

  @Get()
  findAll() {
    return this.gamePlatformsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamePlatformsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGamePlatformDto: UpdateGamePlatformDto) {
    return this.gamePlatformsService.update(+id, updateGamePlatformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamePlatformsService.remove(+id);
  }
}
