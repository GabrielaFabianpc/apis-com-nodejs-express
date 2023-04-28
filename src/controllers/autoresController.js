import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultados = await autores.find();
      res.status(200).json(autoresResultados);
    } catch (error) {
      next(error);
    }
  };
  static cadastrarAutor = async (req, res, next) => {
    try {
      const { nome } = req.body; // assumindo que o nome é a propriedade única que identifica um autor
      const autorExistente = await autores.findOne({ nome }); // procurando um autor com o mesmo nome
      if (autorExistente) {
        res.status(400).send({ message: "Autor já cadastrado no sistema" });
      } else {
        const autor = await new autores(req.body);
        await autor.save();
        res.status(200).json(autor);
      }
    } catch (error) {
      next(error);
    }
  };
  static atualizarAutor = async (req, res, next) => {
    const id = await req.params.id;
    const { nome, nacionalidade } = req.body;
    const autorBody = { nome, nacionalidade };
    try {
      const autorUpdate = await autores.updateOne({ _id: id }, autorBody);
      console.log(autorUpdate);

      if (autorUpdate.matchedCount == 0) {
        next(new NaoEncontrado("Id do Autor não localizado."));
      } else {
        res.status(200).json(autorBody);
      }
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);
      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorDelete = await autores.deleteOne({ _id: id });
      if (autorDelete.deletedCount == 0) {
        next(new NaoEncontrado("Id do autor não localizado!"));
        return;
      } else {
        res.status(200).json({ message: "Autor(a) Deletada com Sucesso!" });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default AutorController;
