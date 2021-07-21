/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";
import * as usuarioUtils from "./Usuarios";

export const buscarArquivoRetornoPaginado = async (quantidadePagina, paginaAtual) => {

    // const requisicao = {
    //     quantidadePagina : quantidadePagina,
    //     paginaAtual: paginaAtual
    // }

    return await backEndUtils.chamarBackEnd("GET", "/historico_retorno").then((resposta) => {
        // if(resposta.status == 200) {
        //     return resposta.json().then((dados) => {
        //         if(dados.data.historico_retorno.length > 0){
        //             dados.data.historico_retorno = dados.data.historico_retorno.map((item) => {
        //                 const usuario = usuarioUtils.buscarUsuarioPorId(item.id_usuario).then(dados => dados);
        //                 return {
        //                     ...item,
        //                     usuario: usuario
        //                 };
        //             });
        //         }
        //         return dados;
        //     });
        // }
        return {};
    })
}

export const buscarArquivoRetornoPorNomeCampanha = async (nomeCampanha) => {

    return await backEndUtils.chamarBackEnd("GET", "/historico_retorno/" + nomeCampanha).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => dados);
        }
    })
}