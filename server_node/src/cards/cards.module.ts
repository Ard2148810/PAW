import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { ListsModule } from '../lists/lists.module';
import {BoardsModule} from "../boards/boards.module";

@Module({
  imports: [TypeOrmModule.forFeature([Card]), ListsModule, BoardsModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
