import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from '../boards/boards.module';
import { Label } from './entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), BoardsModule],
  controllers: [LabelsController],
  providers: [LabelsService],
  exports: [LabelsService],
})
export class LabelsModule {}
