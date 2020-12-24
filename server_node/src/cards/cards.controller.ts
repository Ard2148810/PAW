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
import { CreateBoardResponseDto } from '../boards/dto/create-board-response.dto';

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

  @Get(':card')
  findOne(@Param('cardId') cardId: string) {
    return this.cardsService.findOne(cardId);
  }

  @ApiBody({ type: UpdateCardDto })
  @Put(':card')
  update(
    @Param('cardId') cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(cardId, updateCardDto);
  }

  @Delete(':card')
  remove(@Param('cardId') cardId: string) {
    return this.cardsService.remove(cardId);
  }
}
