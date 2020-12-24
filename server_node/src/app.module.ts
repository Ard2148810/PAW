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

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    BoardsModule,
    ListsModule,
    CardsModule,
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
