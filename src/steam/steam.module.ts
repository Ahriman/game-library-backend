import { Module } from '@nestjs/common';
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';
import { GamesModule } from 'src/games/games.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    GamesModule,
  ],
  controllers: [SteamController],
  providers: [SteamService],
})
export class SteamModule {}
