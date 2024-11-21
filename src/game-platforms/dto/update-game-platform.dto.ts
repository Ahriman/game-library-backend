import { PartialType } from '@nestjs/swagger';
import { CreateGamePlatformDto } from './create-game-platform.dto';

export class UpdateGamePlatformDto extends PartialType(CreateGamePlatformDto) {}
