import { IsNotEmpty, IsString } from 'class-validator';

export class LoginWithSocialDTO {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
