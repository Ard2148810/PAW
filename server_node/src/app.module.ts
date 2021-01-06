import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { ListsModule } from './lists/lists.module';
import { LabelsModule } from './labels/labels.module';
import { CommentsModule } from './comments/comments.module';
import { ChecklistsModule } from './checklists/checklists.module';
import { ItemsModule } from './items/items.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    BoardsModule,
    ListsModule,
    CardsModule,
    LabelsModule,
    CommentsModule,
    ChecklistsModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
