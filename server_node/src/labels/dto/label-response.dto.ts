import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Color } from '../entities/Color';

@Entity()
export class LabelResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  color: Color;
}
