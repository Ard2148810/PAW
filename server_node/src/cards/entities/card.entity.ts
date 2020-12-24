import { Entity, Column, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity()
export class Card {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  comments: [];

  @Column()
  members: string[];

  @Column({ type: 'timestamp' })
  date: Date;

  constructor(name: string, description: string, date: Date) {
    this.id = uuid4().replace(/-/g, '');
    this.name = name;
    this.description = description;
    this.comments = [];
    this.date = date;
  }
}
