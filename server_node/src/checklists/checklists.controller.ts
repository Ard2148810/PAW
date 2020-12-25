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
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
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
import { ChecklistResponseDto } from './dto/checklist-response.dto';

@ApiTags('checklists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/boards/:board/lists/:list/cards/:card/checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @ApiBody({ type: CreateChecklistDto })
  @ApiCreatedResponse({ type: ChecklistResponseDto })
  @ApiBadRequestResponse({ description: '' })
  @ApiNotFoundResponse({ description: 'Board/ List/ Card not found' })
  @Post()
  create(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Body() createChecklistDto: CreateChecklistDto,
  ) {
    return this.checklistsService.create(
      req.user.username,
      board,
      list,
      card,
      createChecklistDto,
    );
  }
  @ApiOperation({
    description: 'Returns all checklists.',
  })
  @ApiOkResponse({ type: ChecklistResponseDto })
  @ApiNotFoundResponse({ description: 'Checklists not found' })
  @Get()
  findAll(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
  ) {
    return this.checklistsService.findAll(req.user.username, board, list, card);
  }

  @ApiOperation({
    description: 'Returns a checklist by id.',
  })
  @ApiOkResponse({ type: ChecklistResponseDto })
  @ApiNotFoundResponse({ description: 'Checklist not found' })
  @Get(':checklist')
  findOne(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('checklist') checklist: string,
  ) {
    return this.checklistsService.findOne(
      req.user.username,
      board,
      list,
      card,
      checklist,
    );
  }

  @ApiOperation({
    description: 'Updates checklist details specified in body.',
  })
  @ApiBody({ type: UpdateChecklistDto })
  @ApiOkResponse({ description: 'Checklist successfully updated' })
  @ApiNotFoundResponse({ description: 'Checklist not found' })
  @Put(':checklist')
  update(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('checklist') checklist: string,
    @Body() updateChecklistDto: UpdateChecklistDto,
  ) {
    return this.checklistsService.update(
      req.user.username,
      board,
      list,
      card,
      checklist,
      updateChecklistDto,
    );
  }

  @ApiOperation({
    description: 'Deletes checklist by id.',
  })
  @ApiOkResponse({ description: 'Checklist successfully deleted' })
  @ApiNotFoundResponse({ description: 'Checklist not found' })
  @ApiBadRequestResponse({
    description: 'Only owner can delete a checklist',
  })
  @Delete(':checklist')
  remove(
    @Request() req,
    @Param('board') board: string,
    @Param('list') list: string,
    @Param('card') card: string,
    @Param('checklist') checklist: string,
  ) {
    return this.checklistsService.remove(
      req.user.username,
      board,
      list,
      card,
      checklist,
    );
  }
}
