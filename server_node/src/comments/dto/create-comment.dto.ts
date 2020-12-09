import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty()
    author: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    date: Date;
}