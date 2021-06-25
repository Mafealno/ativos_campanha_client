/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";
import * as usuarioUtils from "./Usuarios";

export const buscarArquivoRetornoPaginado = async (quantidadePagina, paginaAtual) => {

    // const requisicao = {
    //     quantidadePagina : quantidadePagina,
    //     paginaAtual: paginaAtual
    // }

    return await backEndUtils.chamarBackEnd("GET", "/historico_retorno").then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => {
                if(dados.data.length > 0){
                    dados.data = dados.data.map((item) => {
                        const usuario = usuarioUtils.buscarUsuarioPorId(item.id_usuario).then(dados => dados);
                        return {
                            ...item,
                            usuario: usuario
                        };
                    });
                }

                return dados;
            });
        }
    })
}

export const buscarArquivoRetornoPorNomeCampanha = async (nomeCampanha) => {

    return await backEndUtils.chamarBackEnd("GET", "/historico_retorno/" + nomeCampanha).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => dados);
        }
    })
}