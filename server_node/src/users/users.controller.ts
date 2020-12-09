import { Controller, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Board } from '../boards/entities/board.entity';
import { User } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
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
