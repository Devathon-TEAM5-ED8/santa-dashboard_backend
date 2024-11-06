"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = require("./middlewares/cors");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.corsMiddleware)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/mensaje_nuevo", (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "Mensaje recibido y enviado" });
});
app.get("/mensaje_nuevo", (req, res) => {
    res.status(200).json({ message: "Mensaje recibido y enviado" });
});
// Inicia el servidor en el puerto indicado
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
