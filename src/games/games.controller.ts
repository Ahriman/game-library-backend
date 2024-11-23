import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { Game } from './entities/game.entity';

@ApiTags('Games')
@Controller('games')
export class GamesController {

  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo juego' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiBody({ type: CreateGameDto })
  @ApiResponse({ status: 201, description: 'El juego ha sido creado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los juegos' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de resultados a devolver', example: 10 })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Número de resultados a saltar', example: 0 })
  @ApiResponse({ status: 200, description: 'Lista de juegos obtenida con éxito.', type: [Game] }) // Reemplaza `Game` con el modelo apropiado
  @ApiResponse({ status: 400, description: 'Consulta inválida.' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.gamesService.findAll(paginationDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar juegos por nombre' })
  @ApiQuery({ name: 'search', required: true, type: String, description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Lista de juegos obtenida con éxito.', type: [Game] })
  @ApiResponse({ status: 400, description: 'Consulta inválida.' })
  async search(@Query('search') search: string): Promise<Game[]> {
    return this.gamesService.searchByName(search);
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
  @ApiResponse({ status: 200, description: 'Juego obtenido con éxito.' })
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
  @ApiBody({ type: UpdateGameDto })
  @ApiResponse({ status: 200, description: 'Juego actualizado con éxito.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
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
  @ApiResponse({ status: 200, description: 'Juego eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Juego no encontrado.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.remove(id);
  }
}
