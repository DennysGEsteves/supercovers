import { userMock } from 'test';
import { RegisterUserDto, UpdateUserDto } from '../controller/dto';
import { User } from './user';

describe('Users Model', () => {
  describe('fromRegisterUserDto', () => {
    it('should return User object from RegisterUserDto', () => {
      const dto = {
        email: 'some email',
        name: 'some name',
        password: 'some password',
      } as RegisterUserDto;
      const result = User.fromRegisterUserDto(dto);

      expect(result).toBeInstanceOf(User);
    });
  });

  describe('fromUpdateUserDto', () => {
    it('should return User object from UpdateUserDto with all params', () => {
      const dto = {
        email: 'some email',
        name: 'some name',
        password: 'some password',
      } as UpdateUserDto;
      const result = User.fromUpdateUserDto({ user: userMock, dto });

      expect(result).toBeInstanceOf(User);
    });

    it('should return User object from UpdateUserDto without all params', () => {
      const dto = {} as UpdateUserDto;
      const result = User.fromUpdateUserDto({ user: userMock, dto });

      expect(result).toBeInstanceOf(User);
    });
  });

  describe('toValidateLoginCredentialsPresenter', () => {
    it('should return User object from UpdateUserDto', () => {
      const result = User.toValidateLoginCredentialsPresenter(userMock);

      expect(result).toMatchObject({
        name: userMock.name,
        email: userMock.email,
      });
    });
  });
});
