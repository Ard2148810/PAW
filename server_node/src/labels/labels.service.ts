import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from '../boards/boards.service';
import { Label } from './entities/label.entity';
import { Color } from './entities/color';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
    private readonly boardsService: BoardsService,
  ) {}

  async create(
    username: string,
    boardId: string,
    createLabelDto: CreateLabelDto,
  ) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    const label = new Label(createLabelDto.name, createLabelDto.color);
    board.labels.push(label);
    await this.boardsService.update(username, boardId, board);
    return label;
  }

  async findAll(username: string, boardId: string) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.labels) {
      throw new NotFoundException('Label not found');
    }
    return board.labels;
  }

  async findOne(username: string, boardId: string, labelId: string) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.labels) {
      throw new NotFoundException('Label not found');
    }
    const label = board.labels.find((label) => {
      if (label.id === labelId) return true;
    });
    if (!label) {
      throw new NotFoundException('Label not found');
    }
    return label;
  }

  async update(
    username: string,
    boardId: string,
    labelId: string,
    updateLabelDto: UpdateLabelDto,
  ) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.labels) {
      throw new NotFoundException('Label not found');
    }
    const label = board.labels.find((label) => {
      if (label.id === labelId) return true;
    });
    if (!label) {
      throw new NotFoundException('Label not found');
    }
    const indexOfLabel = board.labels.findIndex(
      (value) => label.id == value.id,
    );
    if (updateLabelDto.color) {
      board.labels[indexOfLabel].color = new Color(updateLabelDto.color);
    }
    if (updateLabelDto.name) {
      board.labels[indexOfLabel].name = updateLabelDto.name;
    }
    await this.boardsService.update(username, boardId, board);
    return board.labels[indexOfLabel];
  }

  async remove(username: string, boardId: string, labelId: string) {
    const board = await this.boardsService.findOne(username, boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.labels) {
      throw new NotFoundException('Label not found');
    }
    const label = board.labels.find((label) => {
      if (label.id === labelId) return true;
    });
    if (!label) {
      throw new NotFoundException('Label not found');
    }
    board.labels = board.labels.filter((label) => label.id !== labelId);
    return;
  }
}
