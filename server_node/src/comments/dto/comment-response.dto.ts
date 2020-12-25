import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CommentResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  author: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  date: Date;
}
