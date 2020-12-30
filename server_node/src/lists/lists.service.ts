import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from '../boards/boards.service';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    private readonly boardsService: BoardsService,
  ) {}

  async create(
    username: string,
    boardId: string,
    createListDto: CreateListDto,
  ) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.lists) {
      board.lists = [];
    }
    const list = new List(createListDto.name, board.lists.length);
    board.lists.push(list);
    await this.boardsService.update(username, boardId, board);
    return list;
  }

  async findAll(username: string, boardId: string) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.lists) {
      throw new NotFoundException('List not found');
    }
    return board.lists;
  }

  async findOne(username: string, boardId: string, listId: string) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.lists) {
      throw new NotFoundException('List not found');
    }
    const list = board.lists.find((list) => {
      if (list.id === listId) return true;
    });
    if (!list) {
      throw new NotFoundException('List not found');
    }
    return list;
  }

  async update(
    username: string,
    boardId: string,
    listId: string,
    updateListDto: UpdateListDto,
  ) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.lists) {
      throw new NotFoundException('List not found');
    }
    const list = board.lists.find((list) => {
      if (list.id === listId) return true;
    });
    if (!list) {
      throw new NotFoundException('List not found');
    }
    const indexOfList = board.lists.findIndex(() => list);
    board.lists[indexOfList].position = updateListDto.position;
    board.lists[indexOfList].name = updateListDto.name;
    if (updateListDto.cards) {
      board.lists[indexOfList].cards = updateListDto.cards;
    }
    await this.boardsService.update(username, boardId, board);
    return board.lists[indexOfList];
  }

  async remove(username: string, boardId: string, listId: string) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.lists) {
      throw new NotFoundException('List not found');
    }
    const list = board.lists.find((list) => {
      if (list.id === listId) return true;
    });
    if (!list) {
      throw new NotFoundException('List not found');
    }
    board.lists = board.lists.filter((list) => list.id !== listId);
    await this.boardsService.update(username, boardId, board);
    return;
  }
}
