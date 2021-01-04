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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import {
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
import { ItemResponseDto } from './dto/item-response.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('items')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller(
  'api/boards/:board/lists/:list/cards/:card/checklists/:checklist/items',
)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({
    description:
      'Creates new item in a checklist. Status is set to false by default.',
  })
  @ApiBody({ type: CreateItemDto })
  @ApiCreatedResponse({ type: ItemResponseDto })
  @ApiNotFoundResponse({
    description: 'Checklist not found',
  })
  @Post()
  create(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('checklist') checklist: string,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemsService.create(
      req.user.username,
      board,
      list,
      card,
      checklist,
      createItemDto,
    );
  }

  @ApiOperation({
    description: 'Returns all items.',
  })
  @ApiOkResponse({ type: [ItemResponseDto] })
  @ApiNotFoundResponse({ description: 'Checklist not found' })
  @Get()
  findAll(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('checklist') checklist: string,
  ) {
    return this.itemsService.findAll(
      req.user.username,
      board,
      list,
      card,
      checklist,
    );
  }

  @ApiOperation({
    description: 'Returns an item by id.',
  })
  @ApiOkResponse({ type: ItemResponseDto })
  @ApiNotFoundResponse({ description: 'Checklist not found' })
  @Get(':item')
  findOne(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('checklist') checklist: string,
    @Param('item') item: string,
  ) {
    return this.itemsService.findOne(
      req.user.username,
      board,
      list,
      card,
      checklist,
      item,
    );
  }

  @ApiOperation({
    description: 'Updates item details specified in body.',
  })
  @ApiBody({ type: UpdateItemDto })
  @ApiOkResponse({ description: 'Item successfully updated' })
  @ApiNotFoundResponse({ description: 'Checklist not found / Item not found' })
  @Put(':item')
  update(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('checklist') checklist: string,
    @Param('item') item: string,

    @Body() updateItemDto: UpdateItemDto,
  ) {
    this.itemsService.update(
      req.user.username,
      board,
      list,
      card,
      checklist,
      item,
      updateItemDto,
    );
    return 'Item successfully updated';
  }

  @ApiOperation({
    description: 'Deletes item by id.',
  })
  @ApiOkResponse({ description: 'Item successfully deleted' })
  @ApiNotFoundResponse({ description: 'Checklist not found' })
  @Delete(':item')
  remove(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('checklist') checklist: string,
    @Param('item') item: string,
  ) {
    this.itemsService.remove(
      req.user.username,
      board,
      list,
      card,
      checklist,
      item,
    );
    return 'Item successfully deleted';
  }
}
