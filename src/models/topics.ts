import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToMany,
} from 'typeorm';

import { Length } from 'class-validator';
import {Word} from "./words";

@Entity('topics')

export class Topic {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @Length(5, 100)
    title: string;

    @ManyToMany(type => Word, word => word.topics)
    words: Word[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
