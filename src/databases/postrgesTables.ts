import { User } from "models/user";
import {Meaning} from "../models/meaning";
import {Setting} from "../models/settings";
import {Topic} from "../models/topic";
import {Word} from "../models/word";

export const postgresTables = [User, Topic, Word, Meaning, Setting];
