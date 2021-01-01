import { ApiProperty } from '@nestjs/swagger';
import { Card } from '../../cards/entities/card.entity';

export class UpdateListDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  position: number;

  @ApiProperty({ required: false })
  cards: Card[];
}
