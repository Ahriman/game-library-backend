import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Platform } from './entities/platform.entity';

@ApiTags('platforms')
@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva plataforma' })
  @ApiResponse({ status: 201, description: 'La plataforma ha sido creada.', type: Platform })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createPlatformDto: CreatePlatformDto) {
    return this.platformsService.create(createPlatformDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las plataformas' })
  @ApiResponse({ status: 200, description: 'Lista de plataformas.', type: [Platform] })
  findAll() {
    return this.platformsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una plataforma por ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID de la plataforma',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'La plataforma ha sido encontrada.', type: Platform })
  @ApiResponse({ status: 404, description: 'Plataforma no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.platformsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una plataforma por ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID de la plataforma',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'La plataforma ha sido actualizada.', type: Platform })
  @ApiResponse({ status: 404, description: 'Plataforma no encontrada.' })
  update(@Param('id') id: string, @Body() updatePlatformDto: UpdatePlatformDto) {
    return this.platformsService.update(id, updatePlatformDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una plataforma por ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID de la plataforma',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 204, description: 'La plataforma ha sido eliminada.' })
  @ApiResponse({ status: 404, description: 'Plataforma no encontrada.' })
  remove(@Param('id') id: string) {
    return this.platformsService.remove(id);
  }
}
