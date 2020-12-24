import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { ApiProperty } from '@nestjs/swagger';
import {Card} from "../../cards/entities/card.entity";

export class UpdateListDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: false })
  position: number;
  @ApiProperty({ required: false })
  cards: Card[];
}
