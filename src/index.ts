import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./database/data-source";

const main = () => {
  AppDataSource.initialize();
  app.listen(app.get("port"));
  console.log(`Server on port ${app.get("port")}`);
};

main();
