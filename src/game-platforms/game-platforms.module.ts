import { Module } from '@nestjs/common';
import { GamePlatformsService } from './game-platforms.service';
import { GamePlatformsController } from './game-platforms.controller';

@Module({
  controllers: [GamePlatformsController],
  providers: [GamePlatformsService],
})
export class GamePlatformsModule {}
