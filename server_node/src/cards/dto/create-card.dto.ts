import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
