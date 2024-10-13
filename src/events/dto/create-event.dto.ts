import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsDateString()
  @IsNotEmpty()
  date2: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  startTime: string;

  @IsMilitaryTime()
  @IsNotEmpty()
  endTime: string;
}
