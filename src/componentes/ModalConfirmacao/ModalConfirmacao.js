import React from "react";

import ModalControle from "../ModalControle/ModalControle";
import Botao from "../Botao/Botao";

import "./ModalConfirmacao.css";

function ModalConfirmacao(props) {
  return (
    <div>
      <>
        <ModalControle
          {...props}
          tamanhoModal="sm"
          estiloModalCabecalho={"text-center"}
          estiloTitulo={"w-100-pc"}
          tituloModal={props.tituloModalConfirmacao}
          conteudoCorpo={
            <div className="row">
              <div className="col text-center">
                <Botao
                  estilo="btn-vermelho w-100-px"
                  clique={() => props.fecharModal()}
                >
                  Cancelar
                </Botao>
              </div>
              <div className="col text-center">
                <Botao
                  estilo="btn-verde w-100-px"
                  clique={() => props.acaoConfirmada(props.fecharModal())}
                >
                  Confirmar
                </Botao>
              </div>
            </div>
          }
        />
      </>
    </div>
  );
}

export default ModalConfirmacao;
