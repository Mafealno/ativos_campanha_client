/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";

export const buscarCampanhaPaginado = async (quantidadePagina, paginaAtual) => {

    // const requisicao = {
    //     quantidadePagina : quantidadePagina,
    //     paginaAtual: paginaAtual
    // }

    return await backEndUtils.chamarBackEnd("GET", "/campanha").then((response) => {
        if(response.status == 200) {
            return response.json().then((dados) => dados);
        }
    })
}

export const buscarCampanhaPorNome = async (nomeCampanha) => {
    return await backEndUtils.chamarBackEnd("GET", "/campanha/" + nomeCampanha).then((response) => {
        if(response.status == 200){
            return response.json().then(dados => dados)
        }
    })
}