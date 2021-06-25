/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";

export const listarLimites = async () => {
    return await backEndUtils.chamarBackEnd("GET", "/limites").then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => dados);
        }
    })
} 