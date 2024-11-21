import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { SteamModule } from './steam/steam.module';
import { UserGamesModule } from './user-games/user-games.module';
import { PlatformsModule } from './platforms/platforms.module';
import { GamePlatformsModule } from './game-platforms/game-platforms.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, // TODO: Cambiar a false para producción || automatizarlo con NODE_ENV
    }),

    UsersModule,

    GamesModule,

    CommonModule,

    AuthModule,

    SteamModule,

    UserGamesModule,

    PlatformsModule,

    GamePlatformsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
