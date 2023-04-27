import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosListados = await livros.find().populate("autor").exec();
      res.status(200).json(livrosListados);
    } catch (error) {
      next(error);
    }
  };
  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livrosPorId = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).send(livrosPorId);
    } catch (error) {
      next(error);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro deletado com sucesso." });
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorAutor = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      const livrosPorAutor = await livros.find({ editora: editora });
      res.status(200).send(livrosPorAutor);
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;
