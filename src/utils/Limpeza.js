/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";
import * as usuarioUtils from "./Usuarios";

export const buscarLimpezaPaginado = async (quantidadePagina, paginaAtual) => {

    // const requisicao = {
    //     quantidadePagina : quantidadePagina,
    //     paginaAtual: paginaAtual
    // }

    return await backEndUtils.chamarBackEnd("GET", "/historico_limpeza").then((response) => {
        if(response.status == 200) {
            return response.json().then((dados) => {
                if(dados.data.length > 0){
                    return dados.data.map((item) => {
                        const usuario = usuarioUtils.buscarUsuarioPorId(item.id_usuario).then(dados => dados);
                        return {
                            ...item,
                            usuario: usuario
                        };
                    })
                }else{
                    return [];
                }
            });
        }
    })
}

export const buscarLimpezaPorNomeCampanha = async (nomeCampanha) => {

    return await backEndUtils.chamarBackEnd("GET", "/historico_limpeza/" + nomeCampanha).then((response) => {
        if(response.status == 200) {
            return response.json().then((dados) => dados);
        }
    })
}