import envs from 'config/environment';
import { Fetch } from 'services';
import { getJwtTokenFromSession } from 'utils';

import { UserUpdateProps, UserCreateProps } from './Users.props';

export const UsersRepository = () => {
  const url = `${envs.apiBaseUrl}/users`;

  async function getMe() {
    return Fetch.get({
      url: `${url}/me`,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function updateMe(data: UserUpdateProps) {
    return Fetch.put({
      url: `${url}/me`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function updateMeAvatar(content: string | ArrayBuffer) {
    return Fetch.put({
      url: `${url}/me/avatar`,
      data: {
        content,
      },
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  function create(data: UserCreateProps) {
    return Fetch.post({
      url,
      data,
    });
  }

  return {
    getMe,
    updateMe,
    updateMeAvatar,
    create,
  };
};

export default UsersRepository;
