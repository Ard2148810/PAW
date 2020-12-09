import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { ObjectID } from 'mongodb';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) { }

  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: string) {
    return this.commentRepository.findOne(id);
  }

  async update(id: string, UpdateCommentDto: UpdateCommentDto) {
    const exists =
      ObjectID.isValid(id) && (await this.commentRepository.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    await this.commentRepository.update(id, UpdateCommentDto);
  }

  async remove(id: string): Promise<void>  {
    await this.commentRepository.delete(id);
  }
}
