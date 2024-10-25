import { User as DBUser } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from 'entities/user';
import { IFormatCreateUserDbData } from '../interfaces';

const salt = bcrypt.genSaltSync(10);

export const formatCreateUserDBData = (user: User): IFormatCreateUserDbData => {
  return {
    email: user.email || null,
    name: user.name,
    password: user.password ? bcrypt.hashSync(user.password, salt) : null,
  } as DBUser;
};
