import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/usersModule';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategy';

@Module({
  imports: [UsersModule, TokenModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy],
})
export class AuthModule {}
