import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  registerUser(
    @Body() registerDto: RegisterUserDto,
  ) {
    console.log(registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  loginUser(
    @Body() loginUserDto: LoginUserDto,
  ) {
    console.log(loginUserDto);
    return this.authService.login();
  }

}
