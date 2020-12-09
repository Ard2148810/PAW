import { Controller, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get()
  findOne(@Request() req) {
    return this.usersService.findOneByUsername(req.user.username);
  }

  @ApiBody({ type: UpdateUserDto })
  @Put()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.username, updateUserDto);
  }

  @Delete()
  remove(@Request() req) {
    return this.usersService.remove(req.user.username);
  }
}
