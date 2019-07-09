import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { IsEmail, Length } from "class-validator";
import {Setting} from "./settings";

@Entity("users")

export class User {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("text")
    public name: string;

    @Column("text")
    @Length(5, 100)
    @IsEmail()
    public email: string;

    @Column("text")
    public hashedPassword: string;

    @OneToOne((type) => Setting, (setting) => setting.user)
    @JoinColumn()
    public setting: Setting;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
