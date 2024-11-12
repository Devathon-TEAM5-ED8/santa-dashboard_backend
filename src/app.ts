import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import routerGps from "./routes/gps/gps.routes";

const port = process.env.PORT || 3000;

const app = express();

app.use(corsMiddleware());
app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/gps", routerGps);

app.post("/mensaje_nuevo", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Mensaje recibido y enviado" });
});

export default app;
