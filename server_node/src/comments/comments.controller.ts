import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentResponseDto } from './dto/comment-response.dto';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/boards/:board/lists/:list/cards/:card/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBody({ type: CreateCommentDto })
  @ApiCreatedResponse({ type: CommentResponseDto })
  @ApiBadRequestResponse({ description: '' })
  @ApiNotFoundResponse({ description: 'Board/ List/ Card not found' })
  @Post()
  create(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(
      req.user.username,
      board,
      list,
      card,
      createCommentDto,
    );
  }
  @ApiOperation({
    description: 'Returns all comments.',
  })
  @ApiOkResponse({ type: CommentResponseDto })
  @ApiNotFoundResponse({ description: 'Comments not found' })
  @Get()
  findAll(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
  ) {
    return this.commentsService.findAll(req.user.username, board, list, card);
  }

  @ApiOperation({
    description: 'Returns a comment by id.',
  })
  @ApiOkResponse({ type: CommentResponseDto })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @Get(':comment')
  findOne(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('comment') comment: string,
  ) {
    return this.commentsService.findOne(
      req.user.username,
      board,
      list,
      card,
      comment,
    );
  }

  @ApiOperation({
    description: 'Updates comment details specified in body.',
  })
  @ApiBody({ type: UpdateCommentDto })
  @ApiOkResponse({ description: 'Comment successfully updated' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @Put(':comment')
  async update(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('comment') comment: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    await this.commentsService.update(
      req.user.username,
      board,
      list,
      card,
      comment,
      updateCommentDto,
    );
    return 'Comment successfully updated.';
  }

  @ApiOperation({
    description: 'Deletes comment by id.',
  })
  @ApiOkResponse({ description: 'Comment successfully deleted' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @ApiBadRequestResponse({
    description: 'Only owner can delete a comment',
  })
  @Delete(':comment')
  async remove(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('comment') comment: string,
  ) {
    await this.commentsService.remove(
      req.user.username,
      board,
      list,
      card,
      comment,
    );
    return 'Comment successfully deleted.';
  }
}
