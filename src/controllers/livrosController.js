import NaoEncontrado from "../erros/NaoEncontrado.js";
import ReqIncorreta from "../erros/ReqIncorreta.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      let { limite = 5, pagina = 1 } = req.query;
      limite = parseInt(limite);
      pagina = parseInt(pagina);
      if (limite > 0 && pagina > 0) {
        const livrosListados = await livros
          .find()
          .sort({ titulo: 1 })
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate("autor")
          .exec();
        res.status(200).json(livrosListados);
      } else {
        next(new ReqIncorreta());
      }
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
      const livroAtualizado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (livroAtualizado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso!" });
      }
      next(new NaoEncontrado("Id do livro não encontrado!"));
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
      if (livrosPorId !== null) {
        res.status(200).send(livrosPorId);
      }
      next(new NaoEncontrado("Id do livro não encontrado!"));
    } catch (error) {
      next(error);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroDelete = await livros.findByIdAndDelete(id);
      if (livroDelete !== null) {
        res.status(200).send({ message: "Livro deletado com sucesso." });
      }
      next(new NaoEncontrado("Id do livro não encontrado!"));
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await buscaPorFiltro(req.query);
      if (busca !== null) {
        const livrosPorFiltro = await livros.find(busca).populate("autor");
        res.status(200).send(livrosPorFiltro);
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };
}

async function buscaPorFiltro(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  //const regex = new RegExp(titulo, "i"); f

  let busca = {};
  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  //Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  //Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }
  return busca;
}

export default LivroController;
