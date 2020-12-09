import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { ObjectID } from 'mongodb';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) { }

  create(createListDto: CreateListDto) {
    return 'This action adds a new list';
  }

  findAll() {
    return this.listRepository.find();
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
