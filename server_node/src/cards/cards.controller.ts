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
import { AssignLabelDto } from './dto/assign-label.dto';

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
  async create(
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

  @ApiOperation({
    description: 'Updates list.',
  })
  @ApiBody({ type: UpdateCardDto })
  @ApiOkResponse({ description: 'Card successfully updated.' })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  @Put(':card')
  async update(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    await this.cardsService.update(
      req.user.username,
      board,
      list,
      card,
      updateCardDto,
    );
    return 'Card successfully updated.';
  }

  @ApiOperation({
    description: 'Deletes card by id.',
  })
  @ApiOkResponse({ description: 'Card successfully deleted' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @Delete(':card')
  async remove(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
  ) {
    await this.cardsService.remove(req.user.username, board, list, card);
    return 'Card successfully deleted';
  }

  @ApiOperation({
    description: 'Adds a label to the card.',
  })
  @ApiOkResponse({ type: [String] })
  @ApiNotFoundResponse({ description: 'Board/ List/ Card/ Label not found' })
  @Put(':card/label')
  async addLabel(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Body() assignLabelDto: AssignLabelDto,
  ) {
    await this.cardsService.addLabel(
      req.user.username,
      board,
      list,
      card,
      assignLabelDto.labelId,
    );
    const newCard = await this.cardsService.findOne(
      req.user.username,
      board,
      list,
      card,
    );
    return newCard.labels;
  }

  @ApiOperation({
    description: 'Removes a label from the card.',
  })
  @ApiOkResponse({ type: [String] })
  @ApiNotFoundResponse({ description: 'Board/ List/ Card/ Label not found' })
  @Delete(':card/label')
  async removeLabel(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Body() assignLabelDto: AssignLabelDto,
  ) {
    await this.cardsService.removeLabel(
      req.user.username,
      board,
      list,
      card,
      assignLabelDto.labelId,
    );
    const newCard = await this.cardsService.findOne(
      req.user.username,
      board,
      list,
      card,
    );
    return newCard.labels;
  }
}
