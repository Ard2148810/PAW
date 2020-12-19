import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ListResponseDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  position: number;
  @ApiProperty({ required: false })
  cards: []
}
