import { Card } from '../cards/entities/card.entity';
export class List {
  name: string;
  position: number;
  cards: Card[];
  constructor(name: string, position: number) {
    this.name = name;
    this.position =position;
    this.cards = [];
  }

}
