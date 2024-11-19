import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserGamesService } from './user-games.service';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { UpdateUserGameDto } from './dto/update-user-game.dto';

@Controller('user-games')
export class UserGamesController {
  constructor(private readonly userGamesService: UserGamesService) {}

  @Post()
  create(@Body() createUserGameDto: CreateUserGameDto) {
    return this.userGamesService.create(createUserGameDto);
  }

  @Get()
  findAll() {
    return this.userGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGamesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserGameDto: UpdateUserGameDto) {
    return this.userGamesService.update(+id, updateUserGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGamesService.remove(+id);
  }

  @Post(':userId')
  async addUserGame(
    @Param('userId') userId: string,
    @Body() gameData: { name: string; genre?: string; developer?: string },
  ) {
    return this.userGamesService.addUserGame(userId, gameData);
  }

}
