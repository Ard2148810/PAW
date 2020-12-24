import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CardResponseDto } from '../../cards/dto/card-response.dto';

@Entity()
export class ListResponseDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  position: number;

  @ApiProperty({ required: true })
  card: CardResponseDto[];
}
