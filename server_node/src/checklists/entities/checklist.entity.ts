import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class Checklist {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  items: Item[];
  constructor(description: string) {
    this.id = uuid4().replace(/-/g, '');
    this.description = description;
    this.items = [];
  }
}
