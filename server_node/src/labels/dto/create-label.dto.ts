import { ApiProperty } from '@nestjs/swagger';
import { Color } from '../entities/Color';

export class CreateLabelDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  color: Color;
}
