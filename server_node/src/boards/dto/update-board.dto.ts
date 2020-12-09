import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  description: string;
}
