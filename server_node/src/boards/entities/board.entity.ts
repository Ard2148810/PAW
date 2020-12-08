import {
  Entity,
  Column,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column((type) => User)
  owner: User;

  @Column()
  teamMembers: [string];
}
