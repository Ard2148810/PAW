import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { List } from '../../lists/entities/list.entity';
import { Label } from '../../labels/entities/label.entity';

@Entity()
export class Board {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ readonly: true })
  owner: string;

  @Column()
  teamMembers: string[];

  @Column()
  isPublic: boolean;

  @Column()
  lists: List[];

  @Column()
  labels: Label[];
}
