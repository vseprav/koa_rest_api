import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";

import { Length } from "class-validator";
import {Word} from "./word";

@Entity("topics")

export class Topic {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("text")
    @Length(5, 100)
    public title: string;

    @ManyToMany((type) => Word, (word) => word.topics)
    @JoinTable()
    public words: Word[];

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
