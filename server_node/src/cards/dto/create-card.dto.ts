import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  date: Date;
}
