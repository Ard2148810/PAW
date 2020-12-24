import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CardResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  comments: [];

  @ApiProperty({ required: false })
  members: string[];

  @ApiProperty({ required: false })
  date: Date;
}
