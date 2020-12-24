import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: false })
  position: number;
}
