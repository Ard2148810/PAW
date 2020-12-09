import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) { }

  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }

  findAll() {
    return this.cardRepository.find();
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

  async remove(id: string): Promise<void>  {
    await this.cardRepository.delete(id);
  }
}
