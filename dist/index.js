"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Habilitar CORS
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/mensaje_nuevo', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: 'Mensaje recibido y enviado' });
});
// app.use(AppRoutes.routes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
