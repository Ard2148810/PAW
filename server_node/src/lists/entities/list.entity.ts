import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Card } from '../../cards/entities/card.entity';

@Entity()
export class List {
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column((type) => Card)
    cards: Card[];

    @Column()
    position: BigInteger;
}
