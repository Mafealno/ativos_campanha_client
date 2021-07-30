/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";
import * as usuarioUtils from "./Usuarios";

export const buscarHistoricoArquivoRetornoPaginado = async (quantidadePagina, paginaAtual) => {

    const requisicao = {
        quantidadePagina : quantidadePagina,
        paginaAtual: paginaAtual
    }

    return await backEndUtils.chamarBackEnd("POST", "/historico_retorno", requisicao).then( async (resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then( async (dados) => {
                if(dados.data.historicos.length > 0){
                    for(let item of dados.data.historicos){
                        item.usuario = await usuarioUtils.buscarUsuarioPorId(item.id_usuario).then(dados => dados);
                    }
                }
                return dados;
            });
        }else{
            return {};
        }
    })
}

export const buscarHistoricoArquivoRetornoPorNomeCampanha = async (nomeCampanha, quantidadePorPagina) => {

    const requisicao = {
        paginaAtual: 0,
        quantidadePagina: quantidadePorPagina,
        campanha: nomeCampanha
    }

    return await backEndUtils.chamarBackEnd("POST", "/historico_retorno_campanha", requisicao).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then(dados => dados);
        }else{
            return {};
        }
    })
}

export const gerarArquivoRetorno = async (idUsuario, idCampanha, campanha, nomeUsuario, sobrenomeUsuario) => {

    const requisicao = {
        id_usuario: idUsuario,
        id_campanha: idCampanha,
        nome: nomeUsuario,
        sobrenome: sobrenomeUsuario, 
        campanha: campanha,
        feito_em: new Date()
    }

    return await backEndUtils.chamarBackEnd("POST", "/retorno", requisicao).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => dados);
        }
    });
}