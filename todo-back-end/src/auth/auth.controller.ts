import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Login')
@ApiSecurity('JWT-auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req, @Body() loginDto : LoginDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user = req.user;
    const payload = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      user: user.id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      firstName: user.firstName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      lastName: user.lastName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      email: user.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      role: user.role,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
