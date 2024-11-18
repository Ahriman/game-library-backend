import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @Get('private')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard())
  testingPrivateRoute() {
    return 'This is a private route';
  }

}
