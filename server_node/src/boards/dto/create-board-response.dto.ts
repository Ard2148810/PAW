import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CreateBoardResponseDto {
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
}
