import { IsNotEmpty, IsString } from 'class-validator';

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
