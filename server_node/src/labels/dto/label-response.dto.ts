import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ColorResponseDto } from './color-response.dto';

@Entity()
export class LabelResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  color: ColorResponseDto;
}
