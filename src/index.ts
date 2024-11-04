import cors from 'cors';
import express from 'express';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());  // Habilitar CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/mensaje_nuevo', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: 'Mensaje recibido y enviado' });

});

// app.use(AppRoutes.routes);

app.listen(port, () => {  // Cambiar de app.listen a server.listen
    console.log(`Server running on port ${port}`);
});

