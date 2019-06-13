import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";

import { Length } from "class-validator";
import {Meaning} from "./meaning";
import { Topic } from "./topic";

@Entity("words")

export class Word {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("text")
    @Length(5, 100)
    public value: string;

    @ManyToMany((type) => Topic)
    @JoinTable()
    public topics: Topic[];

    @OneToMany((type) => Meaning, (meaning) => meaning.word)
    public meanings: Meaning[];

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
