import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ListResponseDto } from '../../lists/dto/list-response.dto';
import { LabelResponseDto } from '../../labels/dto/label-response.dto';

@Entity()
export class BoardResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  owner: string;

  @ApiProperty({ required: true })
  teamMembers: string[];

  @ApiProperty({ required: true })
  isPublic: string;

  @ApiProperty({ required: true })
  lists: ListResponseDto[];

  @ApiProperty({ required: true })
  labels: LabelResponseDto[];
}
