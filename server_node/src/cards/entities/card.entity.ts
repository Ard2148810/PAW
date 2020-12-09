import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Card {
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column((type) => Comment)
    comments: Comment[];

    @Column((type) => User)
    members: User[];

    @Column({ type: 'timestamp' })
    date: Date;
}
