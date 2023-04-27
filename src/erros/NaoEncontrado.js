import ErroBase from "./ErrorBase.js";

class NaoEncontrado extends ErroBase {
  constructor(mensagem = "Pagina não encontrada!") {
    super(mensagem, 404);
  }
}
export default NaoEncontrado;
