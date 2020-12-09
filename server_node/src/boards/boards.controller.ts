import { Controller, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssignUserDto } from './dto/assign-user.dto';

@ApiTags('boards')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiBody({ type: CreateBoardDto })
  @Post()
  async create(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    const board = await this.boardsService.create(
      req.user.username,
      createBoardDto,
    );
    return board;
  }

  @Get()
  findAll(@Request() req) {
    return this.boardsService.findAll(req.user.username);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.boardsService.findOne(req.user.username, id);
  }

  @ApiBody({ type: UpdateBoardDto })
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(req.user.username, id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    await this.boardsService.remove(req.user.username, id);
  }

  @Put(':id/assignment')
  addTeamMember(
    @Request() req,
    @Param('id') id: string,
    @Body() assignUserDto: AssignUserDto,
  ) {
    return this.boardsService.addUser(
      req.user.username,
      id,
      assignUserDto.username,
    );
  }

  @Delete(':id/assignment')
  async removeTeamMember(
    @Request() req,
    @Param('id') id: string,
    @Body() assignUserDto: AssignUserDto,
  ) {
    return this.boardsService.removeUser(
      req.user.username,
      id,
      assignUserDto.username,
    );
  }
}
