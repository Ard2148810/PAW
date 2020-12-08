import {
  Entity,
  Column,
  ObjectIdColumn,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  id: string;

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
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
