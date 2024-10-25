import { User } from 'entities/user';
import { IFormatUpdateUserDbData } from '../interfaces';

export const formatUpdateUserDBData = (user: User): IFormatUpdateUserDbData => {
  return {
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
    userId: user.id,
  };
};
