import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  Request,
  Put,
  Param,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from 'http/middlewares/passport';
import type { Response } from 'express';
import { IUsersUseCases } from 'usecases/user';
import { RegisterUserDto, UpdateUserDto } from './dto';
import { UserPresenters } from './presenters/user-presenters';

@Controller('users')
export class UsersRoute {
  constructor(private readonly usersUseCases: IUsersUseCases) {}

  @Get()
  findAll() {
    return this.usersUseCases.findAll();
  }

  @Post()
  register(@Body() user: RegisterUserDto) {
    return this.usersUseCases.register(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMeData(@Request() req) {
    if (!req?.user) {
      throw new UnauthorizedException();
    }

    return UserPresenters.toGetMeDataPresenter(req.user);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  updateMeData(@Request() req, @Body() dto: UpdateUserDto) {
    return this.usersUseCases.update({ user: req.user, dto });
  }

  @Get('avatar/:userId')
  getUserAvatar(@Res() res: Response, @Param('userId') userId: string) {
    const content = this.usersUseCases.getUserAvatar(userId);
    res.end(content, 'binary');
  }

  @Put('me/avatar')
  @UseGuards(JwtAuthGuard)
  updateMeAvatar(@Request() req, @Body() body: { content: string }) {
    return this.usersUseCases.updateUserAvatar(req.user.id, body.content);
  }
}
