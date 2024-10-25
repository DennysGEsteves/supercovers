import envs from 'config/environment';
import { Fetch } from 'services';

import { mapAuthRead } from './Auth.mapper';
import { CredentialsProps, LoginWithSocial } from './Auth.props';

export const AuthRepository = () => {
  const url = `${envs.apiBaseUrl}/auth`;

  async function authenticate(credentials: CredentialsProps) {
    return Fetch.post({
      url: `${url}/login`,
      data: credentials,
    }).then(({ data }) => mapAuthRead(data));
  }

  async function authenticateWithSocial(credentials: LoginWithSocial) {
    return Fetch.post({
      url: `${url}/login/social`,
      data: credentials,
    }).then(({ data }) => mapAuthRead(data));
  }

  return {
    authenticate,
    authenticateWithSocial,
  };
};

export default AuthRepository;
