import mongoose from "mongoose";
import ErroBase from "../erros/ErrorBase.js";
import ReqIncorreta from "../erros/ReqIncorreta.js";
import ValidacaoIncorreta from "../erros/ValidacaoIncorreta.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new ReqIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ValidacaoIncorreta(erro).enviarResposta(res);
  } else if (erro instanceof NaoEncontrado) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
