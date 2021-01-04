import { ApiProperty } from '@nestjs/swagger';

export class CreateLabelDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  color: string;
}
