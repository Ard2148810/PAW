import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { List } from '../../lists/entities/list.entity';

@Entity()
export class Board {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  teamMembers: string[];

  @Column((type) => List)
  lists: List[];
}
