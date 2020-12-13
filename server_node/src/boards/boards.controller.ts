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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssignUserDto } from './dto/assign-user.dto';
import { CreateBoardResponseDto } from './dto/create-board-response.dto';
import { BoardResponseDto } from './dto/board-response.dto';

@ApiTags('boards')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('api/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({
    description: 'Creates a new board that will belong to user.',
  })
  @ApiBody({ type: CreateBoardDto })
  @ApiCreatedResponse({ type: CreateBoardResponseDto })
  @Post()
  async create(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.create(req.user.username, createBoardDto);
  }

  @ApiOperation({
    description: 'Returns all boards that user belongs to.',
  })
  @ApiOkResponse({ type: [BoardResponseDto] })
  @Get()
  findAll(@Request() req) {
    return this.boardsService.findAll(req.user.username);
  }

  @ApiOperation({
    description: 'Returns a board by id if authorized.',
  })
  @ApiOkResponse({ type: BoardResponseDto })
  @ApiNotFoundResponse({ description: 'Board not found' })
  @Get(':board')
  findOne(@Request() req, @Param('board') board: string) {
    return this.boardsService.findOne(req.user.username, board);
  }

  @ApiOperation({
    description: 'Updates board details specified in body.',
  })
  @ApiBody({ type: UpdateBoardDto })
  @ApiOkResponse({ description: 'Board successfully updated' })
  @ApiNotFoundResponse({ description: 'Board not found' })
  @Put(':board')
  update(
    @Request() req,
    @Param('board') board: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    this.boardsService.update(req.user.username, board, updateBoardDto);
    return 'Board successfully updated';
  }

  @ApiOperation({
    description: 'Deletes board by id provided user is an owner.',
  })
  @ApiOkResponse({ description: 'Board successfully deleted' })
  @ApiNotFoundResponse({ description: 'Board not found' })
  @ApiBadRequestResponse({
    description: 'Only owner can delete a board',
  })
  @Delete(':board')
  async remove(@Request() req, @Param('board') board: string) {
    await this.boardsService.remove(req.user.username, board);
    return 'Board successfully deleted';
  }

  @ApiOperation({
    description:
      'Assigns user specified by username to the board and returns a list of team members.',
  })
  @ApiOkResponse({ type: [String] })
  @ApiBadRequestResponse({ description: 'User already belongs to the board' })
  @ApiNotFoundResponse({ description: 'Board not found / User not found' })
  @Put(':board/assignment')
  async addTeamMember(
    @Request() req,
    @Param('board') board: string,
    @Body() assignUserDto: AssignUserDto,
  ) {
    await this.boardsService.addUser(
      req.user.username,
      board,
      assignUserDto.username,
    );
    const newBoard = await this.boardsService.findOne(req.user.username, board);
    return newBoard.teamMembers;
  }

  @ApiOperation({
    description:
      'Deletes user specified by username from the board and returns a list of team members.',
  })
  @ApiOkResponse({ type: [String] })
  @ApiNotFoundResponse({ description: 'Board not found / User not found' })
  @ApiBadRequestResponse({
    description: 'Owner cannot be deleted from the board',
  })
  @Delete(':board/assignment')
  async removeTeamMember(
    @Request() req,
    @Param('board') board: string,
    @Body() assignUserDto: AssignUserDto,
  ) {
    await this.boardsService.removeUser(
      req.user.username,
      board,
      assignUserDto.username,
    );
    const newBoard = await this.boardsService.findOne(req.user.username, board);
    return newBoard.teamMembers;
  }
}
