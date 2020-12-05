import { Entity, Column, ObjectIdColumn, BeforeInsert } from 'typeorm';
import uuid = require('uuid');

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  @BeforeInsert()
  async b4create() {
    this._id = await uuid.v1();
  }
}
