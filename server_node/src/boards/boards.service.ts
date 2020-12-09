import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(username: string, createBoardDto: CreateBoardDto) {
    const { name, description } = createBoardDto;
    const board = await this.boardRepository.create({
      name: name,
      description: description,
      owner: username,
      teamMembers: [username],
      lists: [],
    });
    return await this.boardRepository.save(board);
  }

  async findAll(username: string) {
    return await this.boardRepository.find({
      where: {
        teamMembers: { $in: [username] },
      },
    });
  }

  async findOne(username: string, id: string) {
    return await this.boardRepository.findOne(id, {
      where: {
        teamMembers: { $in: [username] },
      },
    });
  }

  async update(username: string, id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.findOne(username, id);
    if (!board) {
      throw new NotFoundException();
    }
    await this.boardRepository.update(id, updateBoardDto);
  }

  async remove(username: string, id: string) {
    const board = await this.boardRepository.findOne(id, {
      where: {
        owner: username,
      },
    });
    if (!board) {
      throw new NotFoundException();
    }
    return await this.boardRepository.delete(id);
  }
}
