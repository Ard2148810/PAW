import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly boardsService: BoardsService,
  ) {}

  async create(
    username: string,
    board: string,
    list: string,
    createCardDto: CreateCardDto,
  ) {
    const newList = await this.boardsService.getList(username, board, list);
    if (!newList) {
      throw new NotFoundException('List not found');
    }
    if (!newList.cards) {
      newList.cards = [];
    }
    const card = new Card(
      createCardDto.name,
      createCardDto.description,
      createCardDto.date,
    );
    newList.cards.push(card);
    await this.boardsService.updateList(username, board, list, newList);
    return card;
  }

  async findAll(username: string, board: string, list: string) {
    const newList = await this.boardsService.getList(username, board, list);
    if (!newList) {
      throw new NotFoundException('List/Board not found');
    }
    if (!newList.cards) {
      throw new NotFoundException('Cards not found');
    }
    return newList.cards;
  }

  async findOne(
    username: string,
    boardId: string,
    listId: string,
    cardId: string,
  ) {
    const newList = await this.boardsService.getList(username, boardId, listId);
    if (!newList) {
      throw new NotFoundException('List/Board not found');
    }
    return newList.cards.find((obj) => {
      if (obj.id === cardId) {
        return true;
      }
    });
  }

  async update(
    username: string,
    boardId: string,
    listId: string,
    cardId: string,
    updateCardDto: UpdateCardDto,
  ) {
    const newList = await this.boardsService.getList(username, boardId, listId);
    if (!newList) {
      throw new NotFoundException('List/Board not found');
    }
    const newCard = newList.cards.find((card) => {
      if (card.id === cardId) {
        return true;
      }
    });
    if (!newCard) {
      throw new NotFoundException('Card not found');
    }
    const indexOfCard = newList.cards.findIndex(() => newCard);
    newList.cards[indexOfCard].name = updateCardDto.name;
    newList.cards[indexOfCard].description = updateCardDto.description;
    newList.cards[indexOfCard].comments = updateCardDto.comments;
    newList.cards[indexOfCard].date = updateCardDto.date;
    newList.cards[indexOfCard].members = updateCardDto.members;
    await this.boardsService.updateList(username, boardId, listId, newList);
    return newCard;
  }

  async remove(
    username: string,
    boardId: string,
    listId: string,
    cardId: string,
  ) {
    const newList = await this.boardsService.getList(username, boardId, listId);
    newList.cards = newList.cards.filter((card) => card.id !== cardId);
    return await this.boardsService.updateList(
      username,
      boardId,
      listId,
      newList,
    );
  }
}
