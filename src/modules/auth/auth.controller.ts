import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './responce';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@ApiTags('API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, type: CreateUserDTO })
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @Post('login')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  login(@Body() dto: UserLoginDTO): Promise<any> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
