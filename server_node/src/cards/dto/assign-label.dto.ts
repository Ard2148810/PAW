import { ApiProperty } from '@nestjs/swagger';

export class AssignLabelDto {
  @ApiProperty({ required: true })
  labelId: string;
}
