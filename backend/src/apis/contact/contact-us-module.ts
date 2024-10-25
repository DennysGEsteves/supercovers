import { Module } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { IMailService, MailService } from 'services/mail';
import { MailModule } from 'providers/mail/mail-module';
import { ContactUsRoute } from './contact-us-controller';

@Module({
  controllers: [ContactUsRoute],
  providers: [
    PrismaService,
    // Use Cases
    // Services
    { useClass: MailService, provide: IMailService },
    // Repositories
    // Providers
  ],
  imports: [ConfigModule, MailModule],
})
export class ContactUsModule {}
