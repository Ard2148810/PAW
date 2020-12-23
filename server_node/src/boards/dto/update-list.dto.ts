import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {
  @ApiProperty({ required: true })
  nameOfList: string;
  @ApiProperty({ required: false })
  position: number;
  @ApiProperty({ required: false })
  cards: [];
}
