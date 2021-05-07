/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";

export const buscarCampanhaPaginado = async (quantidadePagina, paginaAtual) => {

    const requisicao = {
        quantidadePagina : quantidadePagina,
        paginaAtual: paginaAtual
    }

    return await backEndUtils.chamarBackEnd("POST", "/campanhas", requisicao).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => dados);
        }
    })
}

export const buscarCampanhaPorNomePaginado = async (nomeCampanha, quantidadePagina) => {

    const requisicao = {
        nomeCampanha: nomeCampanha.toUpperCase(),
        quantidadePagina : quantidadePagina,
        paginaAtual: 0
    }

    return await backEndUtils.chamarBackEnd("POST", "/campanhas/findbyname", requisicao).then((resposta) => {
        // if(resposta.status == 200){
            return resposta.json().then(dados => dados)
        // }
    })
}