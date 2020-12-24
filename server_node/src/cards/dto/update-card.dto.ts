import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  comments: [];

  @ApiProperty({ required: false })
  members: string[];

  @ApiProperty({ required: false })
  labels: string[];

  @ApiProperty({ required: false })
  date: Date;
}
