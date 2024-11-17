import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  registerUser(
    @Body() registerDto: RegisterUserDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  loginUser(
    @Body() loginUserDto: LoginUserDto,
  ) {
    return this.authService.login(loginUserDto);
  }

}
