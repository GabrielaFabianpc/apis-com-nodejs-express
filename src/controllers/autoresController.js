import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultados = await autores.find();
      res.status(200).json(autoresResultados);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor!" });
    }
  };
  static cadastrarAutor = async (req, res) => {
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
      res.status(500).json(error);
    }
  };
  static atualizarAutor = async (req, res) => {
    const id = await req.params.id;
    const { nome, nacionalidade } = req.body;
    const autorBody = { nome, nacionalidade };
    try {
      const autorUpdate = await autores.updateOne({ _id: id }, autorBody);
      if (!autorUpdate) {
        res.status(400).json({ message: "Autor não encontrado no sistema" });
      }
      res.status(200).json(autorBody);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);
      res.status(200).send(autorResultado);
    } catch (erro) {
      res.status(500).send({ message: "Id do Autor não localizado." });
    }
  };

  static deletarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      const autorDelete = await autores.deleteOne({ _id: id });
      console.log(autorDelete);
      if (autorDelete.deletedCount == 0) {
        res
          .status(422)
          .json({ message: "Autor já deletada do nosso Sistema!" });
        return;
      } else {
        res.status(200).json({ message: "Autor(a) Deletada com Sucesso!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Falha ao deletar o autor(a)!" });
    }
  };
}
export default AutorController;
