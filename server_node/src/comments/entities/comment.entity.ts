import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity()
export class CommentEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  date: Date;

  constructor(author: string, description: string, date: Date) {
    this.id = uuid4().replace(/-/g, '');
    this.author = author;
    this.description = description;
    this.date = date;
  }
}
