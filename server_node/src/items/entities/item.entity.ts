import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity()
export class Item {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  status: boolean;

  constructor(description: string) {
    this.id = uuid4().replace(/-/g, '');
    this.description = description;
    this.status = false;
  }
}
