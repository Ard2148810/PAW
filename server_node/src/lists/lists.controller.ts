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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@ApiTags('lists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('boards/:board/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @ApiBody({ type: CreateListDto })
  @Post()
  create(
    @Request() req,
    @Param('board') board: string,
    @Body() createListDto: CreateListDto,
  ) {
    return this.listsService.create(createListDto);
  }

  @Get()
  findAll(@Request() req, @Param('board') boardId: string) {
    return this.listsService.findAll(req.user.username, boardId);
  }

  @Get(':id')
  findOne(
    @Request() req,
    @Param('board') boardId: string,
    @Param('id') id: string,
  ) {
    return this.listsService.findOne(id);
  }

  @ApiBody({ type: UpdateListDto })
  @Put(':id')
  update(
    @Request() req,
    @Param('board') boardId: string,
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':id')
  remove(
    @Request() req,
    @Param('board') boardId: string,
    @Param('id') id: string,
  ) {
    return this.listsService.remove(id);
  }
}
