import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";

import { Length } from "class-validator";
import {User} from "./user";

@Entity("settings")

export class Setting {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("text")
    @Length(5, 100)
    public defaultLang: string;

    @OneToOne((type) => User, (user) => user.setting)
    public user: User;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
