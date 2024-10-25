import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from 'services/mail/mail.service';

const breaklines = (text: string) => {
  return text;
};

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.zoho.com',
        secure: false,
        auth: {
          user: 'contato@supercovers.com.br',
          pass: 'Kenikasupercovers29!',
        },
      },
      defaults: {
        // from: '"No Reply" <noreply@example.com>',
        // to: 'contato@supercovers.com.br',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter({ breaklines }),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
