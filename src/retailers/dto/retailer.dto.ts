import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsDateString } from 'class-validator';
import { IsValidTimeSlot } from 'src/common/TimeValidatonDecorator';

export class CreateNewRetailerDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsValidTimeSlot()
  readonly checkIn: string;

  @ApiProperty()
  @IsValidTimeSlot()
  readonly checkOut: string;

  @ApiProperty()
  @IsDateString()
  readonly date: Date;
}
