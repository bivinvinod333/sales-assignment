import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  readonly userName: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
