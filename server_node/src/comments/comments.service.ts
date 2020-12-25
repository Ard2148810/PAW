import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardsService } from '../cards/cards.service';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly cardsService: CardsService,
  ) {}
  async create(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    createCommentDto: CreateCommentDto,
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
    if (!card.comments) {
      card.comments = [];
    }
    const comment = new CommentEntity(
      usernameId,
      createCommentDto.description,
      createCommentDto.date,
    );
    card.comments.push(comment);
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
    if (!card.comments) {
      throw new NotFoundException('Comments not found.');
    }
    return card.comments;
  }

  async findOne(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    commentId: string,
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
    return card.comments.find((comment) => {
      if (comment.id == commentId) return true;
    });
  }

  async update(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ) {
    const card = await this.cardsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
    );
    if (!card) throw new NotFoundException('List/Board/Card not found.');
    const comment = card.comments.find((card) => {
      if (card.id === cardId) return true;
    });
    if (!comment) throw new NotFoundException('Comment not found');
    const indexOfComment = card.comments.findIndex(() => comment);
    card.comments[indexOfComment].description = updateCommentDto.description;
    card.comments[indexOfComment].date = updateCommentDto.date;
    await this.cardsService.update(usernameId, boardId, listId, cardId, card);
    return card;
  }

  async remove(
    usernameId: string,
    boardId: string,
    listId: string,
    cardId: string,
    commentId: string,
  ) {
    const card = await this.cardsService.findOne(
      usernameId,
      boardId,
      listId,
      cardId,
    );
    card.comments = card.comments.filter((comment) => comment.id !== commentId);
    return await this.cardsService.update(
      usernameId,
      boardId,
      listId,
      cardId,
      card,
    );
  }
}
