import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  @ApiSecurity('JWT-auth')
  @Get()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll() {
    return this.userService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @Delete(':id')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
