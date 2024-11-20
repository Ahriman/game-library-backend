import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SteamService } from './steam.service';
// import { SteamGame } from './interfaces/steam.game';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SteamGame } from './interfaces/steam.game';
import { Steam } from './entities/steam.entity';

@ApiTags('steam')
@Controller('steam')
export class SteamController {

  constructor(private readonly steamService: SteamService) {}

  // Ruta para obtener el SteamID desde el vanityUrl con el nombre de usuario de Steam
  @Get('steamid/:steamUsername')
  @ApiOperation({ summary: 'Obtener el SteamID desde el nombre de usuario de Steam' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el SteamID del usuario.',
    schema: {
      type: 'object',
      properties: {
        steamId: { type: 'string', example: '76561198006409530' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuario de Steam no encontrado.' })
  @ApiParam({ name: 'steamUsername', description: 'El nombre de usuario de Steam', example: 'exampleUser' })
  async getSteamId(@Param('steamUsername') steamUsername: string): Promise<SteamGame[]> {
    return await this.steamService.getSteamIdFromSteamUsername(steamUsername);
  }

  // Ruta para obtener los juegos adquiridos por el usuario usando el SteamID
  @Get('games/:steamId')
  @ApiOperation({ summary: 'Obtener los juegos adquiridos por el usuario usando el SteamID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve los juegos adquiridos por el usuario.',
    type: [Steam],
    links: {
      getSteamId: {
        operationId: 'getSteamId',
        parameters: {
          steamUsername: {
            description: 'El nombre de usuario de Steam',
            example: 'exampleUser'
          }
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuario de Steam no encontrado.' })
  @ApiParam({ name: 'steamId', description: 'El SteamID del usuario', example: '76561198006409530' })
  async getOwnedGames(@Param('steamId') steamId: string){
    return await this.steamService.getOwnedGames(steamId);
  }

}
