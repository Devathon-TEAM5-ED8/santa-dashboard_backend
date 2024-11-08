"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./database/data-source");
const main = () => {
    data_source_1.AppDataSource.initialize();
    app_1.default.listen(app_1.default.get("port"));
    console.log(`Server on port ${app_1.default.get("port")}`);
};
main();
