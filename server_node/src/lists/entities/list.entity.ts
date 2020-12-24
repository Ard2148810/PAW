import { Card } from '../../cards/entities/card.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity()
export class List {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;

  @Column()
  position: number;

  @Column()
  cards: Card[];

  constructor(name: string, position: number) {
    this.id = uuid4().replace(/-/g, '');
    this.name = name;
    this.position = position;
    this.cards = [];
  }
}
