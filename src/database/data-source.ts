require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Gps } from "./entities/Gps";
import { Rol } from "./entities/Rol";
import { Children } from "./entities/Children";
import { Behavior } from "./entities/Behavior";
import { Cards } from "./entities/Cards";
import { Elves } from "./entities/Elves";
import { climate } from "./entities/Climate";
import { reindeer } from "./entities/Reindeer";
import { reindeerAlignment } from "./entities/ReindeerAlignment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Gps,
    Rol,
    Children,
    Behavior,
    Cards,
    Elves,
    climate,
    reindeer,
    reindeerAlignment,
  ],
});
