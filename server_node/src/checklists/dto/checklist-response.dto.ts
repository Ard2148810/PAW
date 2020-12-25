import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class ChecklistResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: false })
  items: Item[];
}
