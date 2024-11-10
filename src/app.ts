import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import reindeerRouters from "./routers/reindeer.routes";

const port = process.env.PORT || 3000;

const app = express();

app.use(corsMiddleware());
app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/reindeer", reindeerRouters);

export default app;
