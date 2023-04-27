import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/erro.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express(); //colocando o express como app

app.use(express.json()); //para aceitar somente formatos json

routes(app); //express lendo as rotas
app.use(manipulador404);
// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;
