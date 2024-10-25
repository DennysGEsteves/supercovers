import { ContactUsDTO } from 'apis/contact/dto';

export abstract class IMailService {
  abstract contactUs(dto: ContactUsDTO): Promise<void>;
}
