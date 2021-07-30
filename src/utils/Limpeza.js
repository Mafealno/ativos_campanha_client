/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";
import * as usuarioUtils from "./Usuarios";
import * as campanhaUtils from "./Campanha";

export const buscarHistoricoLimpezaPaginado = async (quantidadePorPagina, paginaAtual) => {

    const requisicao = {
        quantidadePagina : quantidadePorPagina,
        paginaAtual: paginaAtual
    }

    return await backEndUtils.chamarBackEnd("POST", "/historico_limpeza", requisicao).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then( async (dados) => {
                if(dados.data.historicos.length > 0){
                    for(let item of dados.data.historicos){
                        item.usuario = await usuarioUtils.buscarUsuarioPorId(item.id_usuario).then(dados => dados);
                    }
                }
                return dados;
            });
        }
        return {};
    })
}

export const buscarHistoricoLimpezaPorNomeCampanha = async (nomeCampanha, quantidadePorPagina) => {

    const requisicao = {
        paginaAtual: 0,
        quantidadePagina: quantidadePorPagina,
        campanha: nomeCampanha
    }

    return await backEndUtils.chamarBackEnd("POST", "/historico_limpeza_campanha", requisicao).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then(dados => dados);
        }else{
            return {};
        }
    })
}

export const gerarLimpezaCampanha = async (idUsuario, idCampanha, nomeUsuario, sobrenomeUsuario) => {

    const campanha = await campanhaUtils.buscarCampanhaPorId(idCampanha).then(dados => dados.data.campanhas[0])

    const requisicao = {
        id_usuario: idUsuario,
        id_campanha: idCampanha,
        nome: nomeUsuario,
        sobrenome: sobrenomeUsuario,
        campanha: campanha.CampaignName,
        feito_em: new Date()
    }

    return await backEndUtils.chamarBackEnd("POST", "/limpeza", requisicao).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => dados);
        }
    });
}