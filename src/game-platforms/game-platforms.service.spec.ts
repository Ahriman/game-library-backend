import { Test, TestingModule } from '@nestjs/testing';
import { GamePlatformsService } from './game-platforms.service';

describe('GamePlatformsService', () => {
  let service: GamePlatformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamePlatformsService],
    }).compile();

    service = module.get<GamePlatformsService>(GamePlatformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
