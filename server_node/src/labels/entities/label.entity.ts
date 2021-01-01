import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Color } from './color';
import { v4 as uuid4 } from 'uuid';

@Entity()
export class Label {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: Color;

  constructor(name: string, color: string) {
    this.id = uuid4().replace(/-/g, '');
    this.name = name;
    this.color = new Color(color);
  }
}
