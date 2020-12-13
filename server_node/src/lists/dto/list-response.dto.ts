import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ListResponseDto {
  @ApiProperty()
  id: string;
}
