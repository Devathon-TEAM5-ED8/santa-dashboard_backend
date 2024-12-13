import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import routerGps from "./routes/gps/gps.routes";
import reindeerRouters from "./routers/reindeer.routes";
import climateRouters from "./routers/climate.routes";
import scoreRoutes from "./routers/score.routes";
import cardRoutes from "./routers/cards.routes";

const port = process.env.PORT || 3000;

const app = express();

app.use(corsMiddleware());
app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/gps", routerGps);
app.use("/reindeer", reindeerRouters);
app.use("/climate", climateRouters);
app.use("/scores", scoreRoutes);
app.use("/cards", cardRoutes);

export default app;
