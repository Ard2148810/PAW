import { Double, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ColorResponseDto {
  @ApiProperty({ required: true })
  r: number;

  @ApiProperty({ required: true })
  g: number;

  @ApiProperty({ required: true })
  b: number;

  @ApiProperty({ required: true })
  a: number;
}
