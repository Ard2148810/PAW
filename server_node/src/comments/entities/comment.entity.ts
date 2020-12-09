import {
    Entity,
    Column,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    _id: string;

    @Column()
    author: User;

    @Column()
    description: string;

    @Column({ type: 'timestamp' })
    date: Date;
}
