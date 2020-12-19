import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../models/list';
import { ObjectID } from 'mongodb';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    private readonly boardsService: BoardsService,
  ) {}

  create(createListDto: CreateListDto) {
    return 'This action adds a new list';
  }

  async findAll(username: string, boardId: string) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board.lists;
  }

  findOne(id: string) {
    return this.listRepository.findOne(id);
  }

  async update(id: string, updateListDto: UpdateListDto) {
    const exists =
      ObjectID.isValid(id) && (await this.listRepository.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    await this.listRepository.update(id, UpdateListDto);
  }

  async remove(id: string): Promise<void> {
    await this.listRepository.delete(id);
  }
}
