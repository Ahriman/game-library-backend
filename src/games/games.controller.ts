import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// @ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo juego' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiResponse({ status: 201, description: 'El juego ha sido creado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener una lista de juegos' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, description: 'Límite de resultados por página' })
  @ApiResponse({ status: 200, description: 'Lista de juegos.' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.gamesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un juego por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID único del juego',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({ status: 200, description: 'Detalles del juego.' })
  @ApiResponse({ status: 404, description: 'Juego no encontrado.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un juego por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID único del juego',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    type: 'string',
    format: 'uuid',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiResponse({ status: 200, description: 'El juego ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Juego no encontrado.' })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un juego por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID único del juego',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({ status: 200, description: 'El juego ha sido eliminado.' })
  @ApiResponse({ status: 404, description: 'Juego no encontrado.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.remove(id);
  }
}
