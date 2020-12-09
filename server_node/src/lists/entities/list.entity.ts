import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class List {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;
}
