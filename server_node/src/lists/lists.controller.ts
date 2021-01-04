import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ListResponseDto } from './dto/list-response.dto';

@ApiTags('lists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/boards/:board/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}
  @ApiOperation({
    description: 'Creates a new list.',
  })
  @ApiBody({ type: CreateListDto })
  @ApiCreatedResponse({ type: ListResponseDto })
  @ApiNotFoundResponse({ description: 'Board/ List not found' })
  @Post()
  async create(
    @Request() req,
    @Param('board') board: string,
    @Body() createListDto: CreateListDto,
  ) {
    return await this.listsService.create(
      req.user.username,
      board,
      createListDto,
    );
  }

  @ApiOperation({
    description: 'Returns all lists.',
  })
  @ApiOkResponse({ type: [ListResponseDto] })
  @Get()
  findAll(@Request() req, @Param('board') board: string) {
    return this.listsService.findAll(req.user.username, board);
  }

  @ApiOperation({
    description: 'Returns list by id.',
  })
  @ApiOkResponse({ type: [ListResponseDto] })
  @Get(':list')
  findOne(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
  ) {
    return this.listsService.findOne(req.user.username, board, list);
  }

  @ApiOperation({
    description: 'Updates list.',
  })
  @ApiBody({ type: UpdateListDto })
  @ApiOkResponse({ description: 'List successfully updated.' })
  @ApiNotFoundResponse({ description: 'List not found.' })
  @Put(':list')
  async update(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    await this.listsService.update(
      req.user.username,
      board,
      list,
      updateListDto,
    );
    return 'List successfully updated.';
  }

  @ApiOperation({
    description: 'Deletes list by id.',
  })
  @ApiOkResponse({ description: 'List successfully deleted' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @Delete(':list')
  async remove(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
  ) {
    await this.listsService.remove(req.user.username, board, list);
    return 'List successfully deleted.';
  }
}
