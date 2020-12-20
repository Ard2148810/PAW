import { Card } from '../cards/entities/card.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class List {
  @Column()
  name: string;

  @Column()
  position: number;

  @Column((type) => Card)
  cards: Card[];

  constructor(name: string, position: number) {
    this.name = name;
    this.position = position;
    this.cards = [];
  }
}
