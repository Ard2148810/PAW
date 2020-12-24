import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @ApiProperty({ required: true })
  name: string;
}
