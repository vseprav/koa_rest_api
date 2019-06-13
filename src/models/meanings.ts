import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne,
} from 'typeorm';

import { Length } from 'class-validator';
import {Word} from "./words";

@Entity('meanings')

export class Meaning {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @Length(5, 100)
    value: string;

    @Column('text')
    example: string;

    @ManyToOne(type => Word, word => word.meanings)
    word: Word;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
