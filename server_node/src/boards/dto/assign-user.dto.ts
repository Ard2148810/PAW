import { ApiProperty } from '@nestjs/swagger';

export class AssignUserDto {
  @ApiProperty()
  username: string;
}
