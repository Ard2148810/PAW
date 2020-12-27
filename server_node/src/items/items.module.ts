import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistsModule } from '../checklists/checklists.module';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), ChecklistsModule],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsModule],
})
export class ItemsModule {}
