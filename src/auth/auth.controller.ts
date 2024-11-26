import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRoleGuard } from './guards/user-role.guard';

@ApiTags('Auth')
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

  @Post('verify')
  @ApiBearerAuth('access-token')
  @UseGuards( AuthGuard(), UserRoleGuard )
  @ApiOperation({ summary: 'Verificar token JWT' })
  @ApiResponse({ status: 200, description: 'Token válido.' })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  // verifyToken(@Request() req: Request) {
  //   return { valid: true, user: req.user };
  // }
  verifyToken(@Request() req: Request) {
    return { valid: true };
  }

  @Get('private')
  @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @UseGuards( AuthGuard(), UserRoleGuard )
  @ApiOperation({ summary: 'Endpoint privado' })
  @ApiResponse({ status: 200, description: 'Acceso autorizado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  testingPrivateRoute() {
    return 'This is a private route';
  }

}
