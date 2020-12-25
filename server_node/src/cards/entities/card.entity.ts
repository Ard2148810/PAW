import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { CommentEntity } from '../../comments/entities/comment.entity';
import { Checklist } from '../../checklists/entities/checklist.entity';

@Entity()
export class Card {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  comments: CommentEntity[];

  @Column()
  checklists: Checklist[];

  @Column()
  members: string[];

  @Column()
  labels: string[];

  @Column({ type: 'timestamp' })
  date: Date;

  constructor(name: string, description: string, date: Date) {
    this.id = uuid4().replace(/-/g, '');
    this.name = name;
    this.description = description;
    this.members = [];
    this.comments = [];
    this.date = date;
  }
}
