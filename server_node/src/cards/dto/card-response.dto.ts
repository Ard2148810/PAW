import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from '../../comments/entities/comment.entity';
import { Checklist } from '../../checklists/entities/checklist.entity';

@Entity()
export class CardResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  checklists: Checklist[];

  @ApiProperty({ required: false })
  comments: CommentEntity[];

  @ApiProperty({ required: false })
  members: string[];

  @ApiProperty({ required: false })
  labels: string[];

  @ApiProperty({ required: false })
  date: Date;
}
