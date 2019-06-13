import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToMany, JoinTable, OneToMany,
} from 'typeorm';

import { Length } from 'class-validator';
import { Topic } from "./topics";
import {Meaning} from "./meanings";

@Entity('words')

export class Word {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @Length(5, 100)
    value: string;

    @ManyToMany(type => Topic)
    @JoinTable()
    topics: Topic[];

    @OneToMany(type => Meaning, meaning => meaning.word)
    meanings: Meaning[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
