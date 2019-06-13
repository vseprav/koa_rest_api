import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";

import { Length } from "class-validator";
import {Word} from "./word";

@Entity("meanings")

export class Meaning {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("text")
    @Length(5, 100)
    public value: string;

    @Column("text")
    public example: string;

    @ManyToOne((type) => Word, (word) => word.meanings)
    public word: Word;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
