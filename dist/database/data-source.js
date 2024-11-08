"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv").config();
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Gps_1 = require("./entities/Gps");
const Rol_1 = require("./entities/Rol");
const Children_1 = require("./entities/Children");
const Behavior_1 = require("./entities/Behavior");
const Cards_1 = require("./entities/Cards");
const Elves_1 = require("./entities/Elves");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Gps_1.Gps, Rol_1.Rol, Children_1.Children, Behavior_1.Behavior, Cards_1.Cards, Elves_1.Elves],
});
