import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SteamService } from './steam.service';
import { SteamGame } from './interfaces/steam.game';

@Controller('steam')
export class SteamController {

  constructor(private readonly steamService: SteamService) {}

  // Ruta para obtener el SteamID desde el vanityUrl con el nombre de usuario de Steam
  @Get('steamid/:steamUsername')
  async getSteamId(@Param('steamUsername') steamUsername: string): Promise<SteamGame[]> {
    return await this.steamService.getSteamIdFromSteamUsername(steamUsername);
  }

  // Ruta para obtener los juegos adquiridos por el usuario usando el SteamID
  @Get('games/:steamId')
  async getOwnedGames(@Param('steamId') steamId: string){
    return await this.steamService.getOwnedGames(steamId);
  }

}
