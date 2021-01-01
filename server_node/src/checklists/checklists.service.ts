import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardsService } from '../cards/cards.service';
import { Checklist } from './entities/checklist.entity';

@Injectable()
export class ChecklistsService {
  constructor(
    @InjectRepository(Checklist)
    private readonly checklistRepository: Repository<Checklist>,
    private readonly cardsService: CardsService,
  ) {}
  async create(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    createChecklistDto: CreateChecklistDto,
  ) {
    const card = await this.cardsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
    );
    if (!card) {
      throw new NotFoundException('List not found');
    }
    if (!card.checklists) {
      card.checklists = [];
    }
    const checklist = new Checklist(createChecklistDto.description);
    card.checklists.push(checklist);
    await this.cardsService.update(usernameId, boardId, listId, cardId, card);
    return card;
  }

  async findAll(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
  ) {
    const card = await this.cardsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
    );
    if (!card) {
      throw new NotFoundException('List/Board/Card not found');
    }
    if (!card.checklists) {
      throw new NotFoundException('Checklists not found.');
    }
    return card.checklists;
  }

  async findOne(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string,
  ) {
    const card = await this.cardsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
    );
    if (!card) {
      throw new NotFoundException('List/Board/Card not found.');
    }
    return card.checklists.find((checklist) => {
      if (checklist.id == checklistId) return true;
    });
  }

  async update(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string,
    updateChecklistDto: UpdateChecklistDto,
  ) {
    const card = await this.cardsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
    );
    if (!card) throw new NotFoundException('List/Board/Card not found.');
    const checklist = card.checklists.find((card) => {
      if (card.id === cardId) return true;
    });
    if (!checklist) throw new NotFoundException('Checklist not found');
    const indexOfChecklist = card.checklists.findIndex(() => checklist);
    card.checklists[indexOfChecklist].description =
      updateChecklistDto.description;
    await this.cardsService.update(usernameId, boardId, listId, cardId, card);
    return card;
  }

  async remove(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string,
  ) {
    const card = await this.cardsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
    );
    card.checklists = card.checklists.filter(
      (checklist) => checklist.id !== checklistId,
    );
    await this.cardsService.update(usernameId, boardId, listId, cardId, card);
    return;
  }
}
