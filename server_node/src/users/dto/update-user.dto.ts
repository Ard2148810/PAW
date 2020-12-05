import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiModelProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
