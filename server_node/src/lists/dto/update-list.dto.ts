import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto extends PartialType(CreateListDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  position: BigInteger;
}
