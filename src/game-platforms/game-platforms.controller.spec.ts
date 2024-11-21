import { Test, TestingModule } from '@nestjs/testing';
import { GamePlatformsController } from './game-platforms.controller';
import { GamePlatformsService } from './game-platforms.service';

describe('GamePlatformsController', () => {
  let controller: GamePlatformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamePlatformsController],
      providers: [GamePlatformsService],
    }).compile();

    controller = module.get<GamePlatformsController>(GamePlatformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
