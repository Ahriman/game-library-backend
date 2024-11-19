import { Injectable, Logger } from '@nestjs/common';
import { SteamGame } from './interfaces/steam.game';
import { GamesService } from 'src/games/games.service';

@Injectable()
export class SteamService {

  private readonly logger = new Logger('SteamService');
  private readonly apiKey = 'C41502D29F9EFE71E503452074E2BB6A'; // Tu clave API de Steam // TODO: UTILIZAR UNA VARIABLE DE ENTORNO

  constructor(private readonly gamesService: GamesService) {}

  // Función para obtener el SteamID desde el vanityUrl
  async getSteamIdFromSteamUsername(steamUsername: string): Promise<SteamGame[]> {
    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/`;
    const params = new URLSearchParams({
      key: this.apiKey,
      vanityurl: steamUsername,
    });

    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Respuesta completa de la API de Steam:', data);

      if (data.response.success === 1) {
        console.log('SteamID encontrado:', data.response.steamid);
        return data.response.steamid;
      } else {
        console.error('No se encontró el SteamID para el usuario. Mensaje:', data.response.message);
        return null;
      }
    } catch (error) {
      console.error('Error al resolver el Vanity URL:', error);
      return null;
    }
  }

  // Función para obtener los juegos adquiridos por el usuario usando el SteamID
  async getOwnedGames(steamId: string): Promise<any[]> {
    const url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/';
    const params = new URLSearchParams({
      key: this.apiKey,
      steamid: steamId,
      include_appinfo: '1', // Incluir información adicional sobre los juegos (nombre, etc.)
      include_played_free_games: '1', // Incluir juegos gratuitos jugados
      include_dlc: '0', // No incluir DLCs
      format: 'json', // Formato de la respuesta
    });

    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const steamGames: SteamGame[] = data.response.games;
      console.log(steamGames);
      // const games: SteamGame[] = data.response.games.map((game: SteamGame) => ({
      //   title: game.name,
      //   cover: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
      //   description: '', // Si tienes más datos sobre descripción, añádelos aquí
      // }));
      // console.log('Juegos obtenidos:', games);

      // // Inserta los juegos en la base de datos
      // await this.gamesService.createBulk(games);


      if (steamGames) {
        // Mapea SteamGame a Partial<Game>
        const gamesToSave = steamGames.map(steamGame => ({
          title: steamGame.name,
          cover: `https://steamcdn-a.akamaihd.net/steam/apps/${steamGame.appid}/header.jpg`,
          // Puedes crear un campo description si está presente o simplemente dejarlo vacío
          description: '', // o cualquier otra lógica para el campo description
          steamAppId: steamGame.appid,
        }));

        // Filtra las duplicadas por título
        // const uniqueGames = gamesToSave.filter((game, index, self) =>
        //   index === self.findIndex((g) => (
        //     g.title === game.title
        //   ))
        // );

        const seenTitles = new Set();
        const uniqueGames = gamesToSave.filter(game => {
          if (seenTitles.has(game.title)) {
            return false;
          }
          seenTitles.add(game.title);
          return true;
        });

        const titleCounts = uniqueGames.reduce((acc, game) => {
          acc[game.title] = (acc[game.title] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const duplicateTitles = Object.entries(titleCounts)
          .filter(([, count]) => count > 1)
          .map(([title]) => title);

        console.log('Títulos duplicados:', duplicateTitles);
  
        // Guarda solo los juegos únicos
        this.logger.log('Juegos a guardar:', gamesToSave);
        await this.gamesService.createBulk(gamesToSave);
        this.logger.log('Juegos guardados exitosamente');

        return steamGames;
      }else {
        console.error('No se encontraron juegos para este usuario.');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener los juegos del usuario:', error);
      return [];
    }
  }

}
