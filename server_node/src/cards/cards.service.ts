import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ListsService } from '../lists/lists.service';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly listsService: ListsService,
    private readonly boardsService: BoardsService,
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
    const indexOfCard = list.cards.findIndex((value) => card.id == value.id);
    if (updateCardDto.name) {
      list.cards[indexOfCard].name = updateCardDto.name;
    }
    if (updateCardDto.description) {
      list.cards[indexOfCard].description = updateCardDto.description;
    }
    if (updateCardDto.checklists) {
      list.cards[indexOfCard].checklists = updateCardDto.checklists;
    }
    if (updateCardDto.comments) {
      list.cards[indexOfCard].comments = updateCardDto.comments;
    }
    if (updateCardDto.date) {
      list.cards[indexOfCard].date = updateCardDto.date;
    }
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

  async addLabel(
    username: string,
    boardId: string,
    listId: string,
    cardId: string,
    labelId: string,
  ) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    const label = board.labels.find((label) => {
      if (label.id === labelId) {
        return true;
      }
    });
    if (!label) {
      throw new NotFoundException('Label not found');
    }
    const list = await this.listsService.findOne(username, boardId, listId);
    if (!list) {
      throw new NotFoundException('List not found');
    }
    const card = list.cards.find((card) => {
      if (card.id === cardId) {
        return true;
      }
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    const cardLabel = card.labels.find((label) => {
      if (label === labelId) {
        return true;
      }
    });
    if (!cardLabel) {
      const indexOfCard = list.cards.findIndex((value) => card.id == value.id);
      list.cards[indexOfCard].labels.push(labelId);
      return await this.listsService.update(username, boardId, listId, list);
    }
  }

  async removeLabel(
    username: string,
    boardId: string,
    listId: string,
    cardId: string,
    labelId: string,
  ) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    const label = board.labels.find((label) => {
      if (label.id === labelId) {
        return true;
      }
    });
    if (!label) {
      throw new NotFoundException('Label not found');
    }
    const list = await this.listsService.findOne(username, boardId, listId);
    if (!list) {
      throw new NotFoundException('List not found');
    }
    const card = list.cards.find((card) => {
      if (card.id === cardId) {
        return true;
      }
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    const cardLabel = card.labels.find((label) => {
      if (label === labelId) {
        return true;
      }
    });
    if (cardLabel) {
      const indexOfCard = list.cards.findIndex((value) => card.id == value.id);
      list.cards[indexOfCard].labels.splice(
        list.cards[indexOfCard].labels.indexOf(labelId),
        1,
      );
      return await this.listsService.update(username, boardId, listId, list);
    }
  }
}
