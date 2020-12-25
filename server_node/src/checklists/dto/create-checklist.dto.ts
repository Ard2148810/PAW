import { ApiProperty } from '@nestjs/swagger';

export class CreateChecklistDto {
  @ApiProperty({ required: true })
  description: string;
}
