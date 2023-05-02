import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "O titulo do livro é obrigatório!"],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor(a) é obrigatório!"],
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória!"],
    enum: {
      //apenas valores permitidos
      values: ["Costa", "Alura"],
      message: "A editora {VALUE} não é uma editora permitida!",
    },
  },
  numeroPaginas: {
    type: Number,
    min: [10, "O numero de paginas deve estar entre 10 e 5000 mil!"], // min e max para caso de number
    max: [5000, "O numero de paginas deve estar entre 10 e 5000 mil!"],
  },
});

const livros = mongoose.model("livros", livroSchema);
export default livros;
