import { type, userInfo } from 'os';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ObjectIdColumn } from 'typeorm';
@Entity()
export class Comment {
    @ObjectIdColumn()
    id: string;

    @Column()
    author: string;

    @Column()
    description: string;

    @Column({ type: 'timestamp' })
    date: Date;
}
