import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const livrosListados = await livros.find().populate("autor").exec();
      res.status(200).json(livrosListados);
    } catch (error) {
      res.status(500).send({ message: "Falha ao listar livros!" });
    }
  };
  static cadastrarLivro = async (req, res) => {
    try {
      let livro = await new livros(req.body);
      livro.save();
      res.status(201).json(livro);
    } catch (error) {
      res.status(500).send({ message: "Falha ao cadastrar livro!" });
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const livrosPorId = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).send(livrosPorId);
    } catch (error) {
      res.status(500).send({ message: "Falha ao listar livros!" });
    }
  };

  static deletarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro deletado com sucesso." });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static listarLivroPorAutor = async (req, res) => {
    try {
      const editora = req.query.editora;
      const livrosPorAutor = await livros.find({ editora: editora });
      res.status(200).send(livrosPorAutor);
    } catch (error) {
      res.status(500).send({ message: "Falha ao listar livro por id!" });
    }
  };
}

export default LivroController;
