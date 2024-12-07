import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Patch()
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Body() updateDto: UpdateUserDTO,
    @Req() request,
  ): Promise<UpdateUserDTO> {
    const user = request.user;

    return this.userService.updateUser(user.email, updateDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;

    return this.userService.deleteUser(user.email);
  }
}
