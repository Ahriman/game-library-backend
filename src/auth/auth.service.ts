import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    return await this.usersService.create(registerUserDto);
  }

  login() {
    return 'login';
  }

}
