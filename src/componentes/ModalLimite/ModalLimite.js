/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ModalControle from "../ModalControle/ModalControle";
import EntradaDados from "../EntradaDados/EntradaDados";
import Botao from "../Botao/Botao";

import * as contadorActions from "../../stores/actions/Contador";
import * as validacaoDadosUtils from "../../utils/ValidacaoDados";
import * as limiteUtils from "../../utils/Limites";
import { showToast } from "../ToastControle/ToastControle";

function ModalLimite(props) {
  const modeloValidacao = validacaoDadosUtils.dadosCampo;
  const [dados, setDados] = useState({
    id: { ...modeloValidacao, requerido: true, valorPadrao: "" },
    descricao: { ...modeloValidacao, requerido: true, valorPadrao: "" },
    valor: { ...modeloValidacao, requerido: true, valorPadrao: 0 },
  });

  useEffect(() => {
    if (props.show && props.dados) {
      preencherCampos(props.dados);
    } else {
      limparCampos();
    };
  }, [props.show]);

  const preencherCampos = (dadosLimite) => {
    setDados({
      ...dados,
      id: { ...dados.id, valor: dadosLimite._id },
      descricao: { ...dados.descricao, valor: dadosLimite.descricao },
      valor: { ...dados.valor, valor: dadosLimite.valor },
    });
  };

  const limparCampos = () => {
    setDados({
      ...dados,
      id: { ...dados.id, valor: dados.id.valorPadrao },
      descricao: { ...dados.descricao, valor: dados.descricao.valorPadrao },
      valor: { ...dados.valor, valor: dados.valor.valorPadrao },
    });
  };

  const atualizarLimite = () => {

    let houveErro = validacaoDadosUtils.exibirErroCampo(validacaoDadosUtils.validarDados(dados), false);

    if(houveErro){
        return
    };

    if(dados.valor.valor < 0){
      showToast("erro", "Valor não pode ser negativo");
      return;
    }

    limiteUtils.atualizarLimite(dados).then((dados) => {
        if(dados.success){
            props.setContador(props.contador);
            showToast("sucesso", dados.message);
            props.fecharModal();
        }else{
            showToast("erro", dados.message);
        };
    });
};

  return (
    <ModalControle
      {...props}
      tituloModal={"Editar Limite"}
      tamanhoModal="sm"
      conteudoCorpo={
        <>
          <div className="row">
            <div className="col centralizar">
              <label className="text-center">{dados.descricao.valor ? dados.descricao.valor.charAt(0).toUpperCase() + dados.descricao.valor.slice(1) : ""}</label>
            </div>
            <div className="col-4 centralizar">
              <EntradaDados
                tipo="number"
                id="valor"
                estilo="text-center"
                nome="valor"
                descricao="Limite"
                acaoAcionar={() => ""}
                valorInicial={dados.valor.valor}
                valor={(valorEntrada) =>
                  setDados({
                    ...dados,
                    valor: { ...dados.valor, valor: valorEntrada.valor },
                  })
                }
              />
            </div>
          </div>
        </>
      }
      conteudoRodape={
        <>
          <Botao estilo={"w-100-px btn-verde"} clique={() => atualizarLimite()}>
            Salvar
          </Botao>
        </>
      }
    />
  );
}

const mapStateToProps = (state) => ({
    contador: state.Contador.contador,
});

const mapDispatchToProps = (dispatch) => ({
    setContador : (contador) => dispatch(contadorActions.setContador(contador)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalLimite);
