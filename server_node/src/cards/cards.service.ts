import { Injectable, NotFoundException, Param, Request } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
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
    console.log(card);
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

  findOne(id: string) {
    return this.cardRepository.findOne(id);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const exists =
      ObjectID.isValid(id) && (await this.cardRepository.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    await this.cardRepository.update(id, UpdateCardDto);
  }

  async remove(id: string): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
