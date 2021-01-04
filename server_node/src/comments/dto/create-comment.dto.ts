import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  date: Date;
}
