import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AppErrors } from '../../common/constants/errors';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.checkUserByEmail(dto.email);

    if (existUser) {
      throw new BadRequestException(AppErrors.USER_EXIST);
    }

    return this.userService.createUser(dto);
  }

  async checkUserPassword(verifiablePassword: string, validPassword: string) {
    return bcrypt.compare(verifiablePassword, validPassword);
  }

  async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
    const existUser = await this.userService.checkUserByEmail(dto.email);

    if (!existUser) {
      throw new BadRequestException(AppErrors.USER_NOT_EXIST);
    }

    const validatePassword = await this.checkUserPassword(
      dto.password,
      existUser.password,
    );

    if (!validatePassword) {
      throw new BadRequestException(AppErrors.WRONG_DATA);
    }

    const userData = {
      name: existUser.firstName,
      email: existUser.email,
    };

    const token = await this.tokenService.generateJwtToken(userData);
    const user = await this.userService.publicUser(dto.email);

    return { ...user, token };
  }
}
