import { PartialType } from '@nestjs/mapped-types';
import { CreateLabelDto } from './create-label.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Color } from '../entities/Color';

export class UpdateLabelDto extends PartialType(CreateLabelDto) {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  color: Color;
}
