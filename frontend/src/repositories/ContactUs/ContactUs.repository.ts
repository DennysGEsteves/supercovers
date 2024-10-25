import envs from 'config/environment';
import { Fetch } from 'services';

import { ContactUsDTO } from './ConstactUs.props';

export const ContactUsRepository = () => {
  const url = `${envs.apiBaseUrl}/contact-us`;

  async function sendEmail(data: ContactUsDTO) {
    return Fetch.post({
      url: `${url}`,
      data,
    });
  }

  return {
    sendEmail,
  };
};

export default ContactUsRepository;
