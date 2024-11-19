import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'El usuario ha sido creado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  registerUser(
    @Body() registerDto: RegisterUserDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  loginUser(
    @Body() loginUserDto: LoginUserDto,
  ) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Endpoint privado' })
  @ApiResponse({ status: 200, description: 'Acceso autorizado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  testingPrivateRoute() {
    return 'This is a private route';
  }

}
