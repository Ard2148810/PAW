import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ItemResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  status: boolean;
}
