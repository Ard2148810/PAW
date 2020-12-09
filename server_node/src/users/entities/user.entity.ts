import { Entity, Column, ObjectIdColumn, BeforeInsert } from 'typeorm';
import { hash } from 'bcrypt';
import { Board } from '../../boards/entities/board.entity';

@Entity()
export class User {
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

  @Column((type) => Board)
  boards: Board[];

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
