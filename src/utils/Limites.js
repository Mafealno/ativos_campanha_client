/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";

export const listarLimites = async () => {
    return await backEndUtils.chamarBackEnd("GET", "/limites").then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => dados);
        }
    })
} 

export const cadastrarLimites = async (obj) => {
    return await backEndUtils.chamarBackEnd("POST", "/limites", obj).then((resposta) => {
        if(resposta.status == 201) {
            return resposta.json().then((dados) => dados);
        }
    })
}

export const atualizarLimite = async (obj) => {

    const limite = {
        descricao: obj.descricao.valor,
        valor: obj.valor.valor
    }

    return await backEndUtils.chamarBackEnd("PUT", "/limites/" + obj.id.valor, limite).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => dados);
        }
    });
}