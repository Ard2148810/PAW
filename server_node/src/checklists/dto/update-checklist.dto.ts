import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateChecklistDto } from './create-checklist.dto';

export class UpdateChecklistDto extends PartialType(CreateChecklistDto) {
  @ApiProperty({ required: false })
  description: string;
}
