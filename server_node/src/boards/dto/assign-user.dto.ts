import { ApiProperty } from '@nestjs/swagger';

export class AssignUserDto {
  @ApiProperty({ required: true })
  username: string;
}
