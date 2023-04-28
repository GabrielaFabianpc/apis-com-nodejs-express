import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      required: [true, "O nome do Autor(a) é obrigatório!"],
      enum: {
        values: ["Gabriela", "Trajano"],
        message: "O autor(a) {VALUE} não é permitido! ",
      },
    },
    // email: { type: String, required: true },
    nacionalidade: {
      type: String,
      required: true,
      enum: {
        values: ["Italiano", "Frances"],
        message: "A nacionalidade {VALUE} não é permitida!",
      },
    },
  },
  {
    versionKey: false,
  }
);

const autores = mongoose.model("autores", autorSchema);
export default autores;
