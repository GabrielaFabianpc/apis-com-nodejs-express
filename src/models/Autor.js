import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      required: [true, "O nome do Autor(a) é obrigatório!"],
    },
    // email: { type: String, required: true },
    nacionalidade: {
      type: String,
      required: [true, "A nacionalidade do Autor(a) é obrigatório!"],
    },
  },
  {
    versionKey: false,
  }
);

const autores = mongoose.model("autores", autorSchema);
export default autores;
