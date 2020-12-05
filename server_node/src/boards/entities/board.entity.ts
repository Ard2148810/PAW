import { Entity, Column, ObjectIdColumn, BeforeInsert } from 'typeorm';
import uuid = require('uuid');
import { User } from '../../users/entities/user.entity';

@Entity()
export class Board {
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

  @BeforeInsert()
  async b4create() {
    this._id = await uuid.v1();
  }
}
