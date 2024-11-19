import { Module } from '@nestjs/common';
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';
import { GamesModule } from 'src/games/games.module';

@Module({
  controllers: [SteamController],
  providers: [SteamService],
  imports: [GamesModule],
})
export class SteamModule {}
