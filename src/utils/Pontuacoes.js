/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";

export const buscarPontuacoesPaginado = async (quantidadePagina, paginaAtual) => {

    const requisicao = {
        quantidadePagina : quantidadePagina,
        paginaAtual: paginaAtual
    }

    return await backEndUtils.chamarBackEnd("POST", "/pontuacao", requisicao).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then(dados => dados);
        }
    })
}

export const buscarPontuacoesPorTelefone = async (quantidadePorPagina, telefone) => {

    const requisicao = {
        paginaAtual: 0,
        quantidadePagina : quantidadePorPagina,
        telefone: telefone
    }

    return await backEndUtils.chamarBackEnd("POST", "/pontuacao_por_telefone", requisicao).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then(dados => {
                return dados
            });
        }
    })
}

export const retornarPropriedades = (obj) => {

    let propriedades = [];

    Object.keys(obj).forEach(campo => {
        if(campo != 'telefone' && campo != '__v' && campo != '_id'){
            propriedades.push({
                propriedade: campo,
                valor: obj[campo]
            });
        }
    });

    return propriedades;
}

export const ordernarLista = (listaPropriedades, ordernacaoLista) => {
    const list = listaPropriedades.sort((a, b) => {

        const A = a[ordernacaoLista.tipoOrdenacao];
        const B = b[ordernacaoLista.tipoOrdenacao];

        if(A > B)
            return ordernacaoLista.ordem ? 1 : -1;
        else if(A < B)
            return ordernacaoLista.ordem ? -1 : 1;
        return 0
    });

    return list;
    
}