import { AuthDTO } from './Auth.dto';

export const mapAuthRead = (data: any): AuthDTO => ({
  email: data.email,
  image: data.image,
  name: data.name,
  token: data.token,
});
