import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ListsService } from '../lists/lists.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly listsService: ListsService,
  ) {}

  async create(
    username: string,
    boardId: string,
    listId: string,
    createCardDto: CreateCardDto,
  ) {
    const list = await this.listsService.findOne(username, boardId, listId);
    if (!list) {
      throw new NotFoundException('List not found');
    }
    if (!list.cards) {
      list.cards = [];
    }
    const card = new Card(
      createCardDto.name,
      createCardDto.description,
      createCardDto.date,
    );
    list.cards.push(card);
    await this.listsService.update(username, boardId, listId, list);
    return card;
  }

  async findAll(username: string, boardId: string, listId: string) {
    const list = await this.listsService.findOne(username, boardId, listId);
    if (!list) {
      throw new NotFoundException('List/Board not found');
    }
    if (!list.cards) {
      throw new NotFoundException('Cards not found');
    }
    return list.cards;
  }

  async findOne(
    username: string,
    boardId: string,
    listId: string,
    cardId: string,
  ) {
    const list = await this.listsService.findOne(username, boardId, listId);
    if (!list) {
      throw new NotFoundException('List/Board not found');
    }
    return list.cards.find((obj) => {
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
    const list = await this.listsService.findOne(username, boardId, listId);
    if (!list) {
      throw new NotFoundException('List/Board not found');
    }
    const card = list.cards.find((card) => {
      if (card.id === cardId) {
        return true;
      }
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    const indexOfCard = list.cards.findIndex(() => card);
    list.cards[indexOfCard].name = updateCardDto.name;
    list.cards[indexOfCard].description = updateCardDto.description;
    list.cards[indexOfCard].checklists = updateCardDto.checklists;
    list.cards[indexOfCard].comments = updateCardDto.comments;
    list.cards[indexOfCard].date = updateCardDto.date;
    if (Array.isArray(updateCardDto.members) && updateCardDto.members.length) {
      updateCardDto.members.forEach((value) => {
        list.cards[indexOfCard].members.push(value);
      });
    }
    if (Array.isArray(updateCardDto.labels) && updateCardDto.labels.length) {
      updateCardDto.labels.forEach((value) => {
        list.cards[indexOfCard].labels.push(value);
      });
    }
    await this.listsService.update(username, boardId, listId, list);
    return card;
  }

  async remove(
    username: string,
    boardId: string,
    listId: string,
    cardId: string,
  ) {
    const list = await this.listsService.findOne(username, boardId, listId);
    list.cards = list.cards.filter((card) => card.id !== cardId);
    await this.listsService.update(username, boardId, listId, list);
    return;
  }

}
