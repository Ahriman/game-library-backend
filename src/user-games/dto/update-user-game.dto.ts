import { PartialType } from '@nestjs/swagger';
import { CreateUserGameDto } from './create-user-game.dto';

export class UpdateUserGameDto extends PartialType(CreateUserGameDto) {}
