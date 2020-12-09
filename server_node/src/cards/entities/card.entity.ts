import {
    Entity,
    Column,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    _id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    comments: [Comment]
    @Column()
    teamMembers: [string];

    @Column({ type: 'timestamp' })
    date: Date;
}
