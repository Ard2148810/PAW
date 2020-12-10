import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Card {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  members: string[];

  @Column({ type: 'timestamp' })
  date: Date;
}
