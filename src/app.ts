import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import reindeerRouters from "./routers/reindeer.routes";
import climateRouters from "./routers/climate.routes";

const port = process.env.PORT || 3000;

const app = express();

app.use(corsMiddleware());
app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/reindeer", reindeerRouters);
app.use("/climate", climateRouters);

export default app;
