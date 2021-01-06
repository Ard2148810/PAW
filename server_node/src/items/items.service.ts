import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ChecklistsService } from '../checklists/checklists.service';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly checklistsService: ChecklistsService,
  ) {}

  async create(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string,
    createItemDto: CreateItemDto,
  ) {
    const checklist = await this.checklistsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
      checklistId,
    );
    if (!checklist) {
      throw new NotFoundException('Checklist not found');
    }
    const item = new Item(createItemDto.description);
    checklist.items.push(item);
    await this.checklistsService.update(
      usernameId,
      boardId,
      listId,
      cardId,
      checklistId,
      checklist,
    );
    return item;
  }

  async findAll(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string,
  ) {
    const checklist = await this.checklistsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
      checklistId,
    );
    if (!checklist) {
      throw new NotFoundException('Checklist not found');
    }
    return checklist.items;
  }

  async findOne(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string,
    itemId: string,
  ) {
    const checklist = await this.checklistsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
      checklistId,
    );
    if (!checklist) {
      throw new NotFoundException('Checklist not found');
    }
    return checklist.items.find((item) => {
      if (item.id == itemId) return true;
    });
  }

  async update(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string,
    itemId,
    updateItemDto: UpdateItemDto,
  ) {
    const checklist = await this.checklistsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
      checklistId,
    );
    if (!checklist) throw new NotFoundException('Checklist not found');
    const item = checklist.items.find((item) => {
      if (item.id === itemId) return true;
    });
    if (!item) throw new NotFoundException('Item not found');
    const indexOfItem = checklist.items.findIndex(
      (value) => item.id == value.id,
    );
    if (updateItemDto.description) {
      checklist.items[indexOfItem].description = updateItemDto.description;
    }
    if (updateItemDto.status != null) {
      checklist.items[indexOfItem].status = updateItemDto.status;
    }
    return await this.checklistsService.update(
      usernameId,
      boardId,
      listId,
      cardId,
      checklistId,
      checklist,
    );
  }

  async remove(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string,
    itemId: string,
  ) {
    const checklist = await this.checklistsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
      checklistId,
    );
    if (!checklist) throw new NotFoundException('Checklist not found');
    checklist.items = checklist.items.filter((item) => item.id !== itemId);
    return await this.checklistsService.update(
      usernameId,
      boardId,
      listId,
      cardId,
      checklistId,
      checklist,
    );
  }
}
