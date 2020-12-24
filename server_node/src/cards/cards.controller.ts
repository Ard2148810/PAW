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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardResponseDto } from './dto/card-response.dto';

@ApiTags('cards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/boards/:board/lists/:list/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
  @ApiOperation({
    description: 'Creates a new card.',
  })
  @ApiBody({ type: CreateCardDto })
  @ApiCreatedResponse({ type: CardResponseDto })
  @ApiBadRequestResponse({ description: '' })
  @ApiNotFoundResponse({ description: 'Board/ List not found' })
  @Post()
  create(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.cardsService.create(
      req.user.username,
      board,
      list,
      createCardDto,
    );
  }

  @ApiOperation({
    description: 'Returns all cards from list',
  })
  @ApiOkResponse({ type: [CardResponseDto] })
  @Get()
  findAll(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
  ) {
    return this.cardsService.findAll(req.user.username, board, list);
  }

  @ApiOperation({
    description: 'Returns card',
  })
  @ApiOkResponse({ type: [CardResponseDto] })
  @Get(':card')
  findOne(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
  ) {
    return this.cardsService.findOne(req.user.username, board, list, card);
  }

  @ApiBody({ type: UpdateCardDto })
  @Put(':card')
  update(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(
      req.user.username,
      board,
      list,
      card,
      updateCardDto,
    );
  }

  @Delete(':card')
  remove(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
  ) {
    return this.cardsService.remove(req.user.username, board, list, card);
  }
}
