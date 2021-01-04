import { Controller, Body, UseGuards, Request, Param } from '@nestjs/common';
import { Get, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description:
      'Returns details of a user. Accepts username as the parameter.',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':username')
  findOneWithParam(@Param('username') username: string) {
    return this.usersService.findOneByUsernameAndReturn(username);
  }

  @ApiOperation({
    description:
      'Returns details of a logged in user based on token passed in auth bearer.',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get()
  findOne(@Request() req) {
    console.log(req.user.username);
    return this.usersService.findOneByUsernameAndReturn(req.user.username);
  }

  @ApiOperation({ description: 'Updates user details specified in body.' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'User successfully updated' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Put()
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(req.user.username, updateUserDto);
    return 'User successfully updated';
  }

  @ApiOperation({
    description: 'Deletes logged in user and all their owned boards.',
  })
  @ApiOkResponse({ description: 'User successfully deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete()
  async remove(@Request() req) {
    await this.usersService.remove(req.user.username);
    return 'User successfully deleted';
  }
}
