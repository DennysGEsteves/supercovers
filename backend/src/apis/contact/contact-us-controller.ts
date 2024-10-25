import { Body, Controller, Get, Post } from '@nestjs/common';
import { IMailService } from 'services/mail';
import { ContactUsDTO } from './dto';

@Controller('contact-us')
export class ContactUsRoute {
  constructor(private readonly mailService: IMailService) {}

  @Post()
  createPlaylist(@Body() dto: ContactUsDTO) {
    return this.mailService.contactUs(dto);
  }

  @Get('health')
  health() {
    return true;
  }
}
