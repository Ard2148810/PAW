import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
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
@Controller('api/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiBody({ type: CreateBoardDto })
  @Post()
  async create(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.create(req.user.username, createBoardDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.boardsService.findAll(req.user.username);
  }

  @Get(':board')
  findOne(@Request() req, @Param('board') board: string) {
    return this.boardsService.findOne(req.user.username, board);
  }

  @ApiBody({ type: UpdateBoardDto })
  @Put(':board')
  update(
    @Request() req,
    @Param('board') board: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(req.user.username, board, updateBoardDto);
  }

  @Delete(':board')
  async remove(@Request() req, @Param('board') board: string) {
    await this.boardsService.remove(req.user.username, board);
  }

  @Put(':board/assignment')
  addTeamMember(
    @Request() req,
    @Param('board') board: string,
    @Body() assignUserDto: AssignUserDto,
  ) {
    return this.boardsService.addUser(
      req.user.username,
      board,
      assignUserDto.username,
    );
  }

  @Delete(':board/assignment')
  async removeTeamMember(
    @Request() req,
    @Param('board') board: string,
    @Body() assignUserDto: AssignUserDto,
  ) {
    return this.boardsService.removeUser(
      req.user.username,
      board,
      assignUserDto.username,
    );
  }
}
