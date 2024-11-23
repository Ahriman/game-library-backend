import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserGamesService } from './user-games.service';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { UpdateUserGameDto } from './dto/update-user-game.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGame } from './entities/user-game.entity';

@ApiTags('UserGames')
@Controller('user-games')
export class UserGamesController {
  constructor(private readonly userGamesService: UserGamesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo juego de usuario' })
  @ApiResponse({ status: 201, description: 'El juego de usuario ha sido creado exitosamente.', type: UserGame })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiBody({ type: CreateUserGameDto })
  create(@Body() createUserGameDto: CreateUserGameDto) {
    return this.userGamesService.create(createUserGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los juegos de usuario' })
  @ApiResponse({ status: 200, description: 'Devuelve todos los juegos de usuario.', type: [UserGame] })
  findAll() {
    return this.userGamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un juego de usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el juego de usuario.',
    type: UserGame,
    links: {
      updateUserGame: {
        operationId: 'update',
        parameters: {
          id: {
            description: 'El ID del juego de usuario',
            example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
          }
        }
      },
      deleteUserGame: {
        operationId: 'remove',
        parameters: {
          id: {
            description: 'El ID del juego de usuario',
            example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
          }
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Juego de usuario no encontrado.' })
  @ApiParam({ name: 'id', description: 'El ID del juego de usuario', example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @ApiBody({ type: UpdateUserGameDto })
  findOne(@Param('id') id: string) {
    return this.userGamesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un juego de usuario por ID' })
  @ApiResponse({ status: 200, description: 'El juego de usuario ha sido actualizado exitosamente.', type: UserGame })
  @ApiResponse({ status: 404, description: 'Juego de usuario no encontrado.' })
  @ApiParam({ name: 'id', description: 'El ID del juego de usuario', example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @ApiBody({ type: UpdateUserGameDto })
  update(@Param('id') id: string, @Body() updateUserGameDto: UpdateUserGameDto) {
    return this.userGamesService.update(+id, updateUserGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un juego de usuario por ID' })
  @ApiResponse({ status: 200, description: 'El juego de usuario ha sido eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Juego de usuario no encontrado.' })
  @ApiParam({ name: 'id', description: 'El ID del juego de usuario', example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  remove(@Param('id') id: string) {
    return this.userGamesService.remove(+id);
  }

  @Post(':userId')
  @ApiOperation({ summary: 'Agregar un juego a un usuario' })
  @ApiResponse({ status: 201, description: 'El juego ha sido agregado exitosamente al usuario.', type: UserGame })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiParam({ name: 'userId', description: 'El ID del usuario', example: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Nombre del Juego' },
        genre: { type: 'string', example: 'Acción', nullable: true },
        developer: { type: 'string', example: 'Desarrollador del Juego', nullable: true },
      },
    },
  })
  async addUserGame(
    @Param('userId') userId: string,
    @Body() gameData: { name: string; genre?: string; developer?: string },
  ) {
    return this.userGamesService.addUserGame(userId, gameData);
  }

}
