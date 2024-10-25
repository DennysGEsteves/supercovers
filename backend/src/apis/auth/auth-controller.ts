import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { IAuthUseCases } from 'usecases/auth';
import { LocalAuthGuard } from '../../http/middlewares/passport';
import { LoginWithSocialDTO } from './dto';

@Controller('auth')
export class AuthRoute {
  constructor(private authUseCases: IAuthUseCases) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @Post('login/social')
  loginWithSocial(@Body() dto: LoginWithSocialDTO) {
    return this.authUseCases.loginWithSocial(dto);
  }
}
