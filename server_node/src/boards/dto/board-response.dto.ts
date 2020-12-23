import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ListResponseDto } from '../../dtos/list-response.dto';

@Entity()
export class BoardResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  teamMembers: string[];

  @ApiProperty()
  isPublic: string;

  @ApiProperty({ required: true })
  lists: ListResponseDto[];
}
