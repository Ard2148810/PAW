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
  ApiBearerAuth,
  ApiBody,
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

  @ApiBody({ type: CreateCardDto })
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
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
