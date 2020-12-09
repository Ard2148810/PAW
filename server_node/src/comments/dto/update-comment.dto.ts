import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @ApiModelProperty()
    author: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    date: Date;
}
