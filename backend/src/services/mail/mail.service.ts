import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ContactUsDTO } from 'apis/contact/dto';
import { IMailService } from '.';

export type SendEmailParams = {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
};

@Injectable()
export class MailService implements IMailService {
  constructor(private mailerService: MailerService) {}

  async contactUs(dto: ContactUsDTO) {
    await this.mailerService.sendMail({
      to: 'contato@supercovers.com.br',
      from: dto.email,
      subject: dto.subject,
      template: './contact-us',
      context: {
        message: dto.message,
        name: dto.name,
      },
    });
  }
}
