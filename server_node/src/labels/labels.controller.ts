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
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LabelResponseDto } from './dto/label-response.dto';

@ApiTags('labels')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/boards/:board/labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}
  @ApiOperation({
    description: 'Creates a new label.',
  })
  @ApiBody({ type: CreateLabelDto })
  @ApiCreatedResponse({ type: LabelResponseDto })
  @ApiNotFoundResponse({ description: 'Board/ Label not found' })
  @Post()
  async create(
    @Request() req,
    @Param('board') board: string,
    @Body() createLabelDto: CreateLabelDto,
  ) {
    return await this.labelsService.create(
      req.user.username,
      board,
      createLabelDto,
    );
  }

  @ApiOperation({
    description: 'Returns all labels.',
  })
  @ApiOkResponse({ type: [LabelResponseDto] })
  @Get()
  findAll(@Request() req, @Param('board') board: string) {
    return this.labelsService.findAll(req.user.username, board);
  }

  @ApiOperation({
    description: 'Returns label by id.',
  })
  @ApiOkResponse({ type: [LabelResponseDto] })
  @Get(':label')
  findOne(
    @Request() req,
    @Param('board') board: string,
    @Param('label') label: string,
  ) {
    return this.labelsService.findOne(req.user.username, board, label);
  }

  @ApiOperation({
    description: 'Updates label.',
  })
  @ApiBody({ type: UpdateLabelDto })
  @ApiOkResponse({ description: 'Label successfully updated.' })
  @ApiNotFoundResponse({ description: 'Label not found.' })
  @Put(':label')
  async update(
    @Request() req,
    @Param('board') board: string,
    @Param('label') label: string,
    @Body() updateLabelDto: UpdateLabelDto,
  ) {
    await this.labelsService.update(
      req.user.username,
      board,
      label,
      updateLabelDto,
    );
    return 'Label successfully updated.';
  }

  @ApiOperation({
    description: 'Deletes label by id.',
  })
  @ApiOkResponse({ description: 'Label successfully deleted' })
  @ApiNotFoundResponse({ description: 'Label not found' })
  @Delete(':label')
  async remove(
    @Request() req,
    @Param('board') board: string,
    @Param('label') label: string,
  ) {
    await this.labelsService.remove(req.user.username, board, label);
    return 'Label successfully deleted.';
  }
}
