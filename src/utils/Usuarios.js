/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";

export const montarUsuario = (dados) => {
    return {
        usuario: dados.usuario.valor,
        nome: dados.nome.valor,
        sobrenome: dados.sobrenome.valor,
        email: dados.email.valor,
        senha: dados.senha.valor,
        permissoes: [ dados.tipoUsuario.valor ],
        criado_por: dados.criadoPor.valor,
        criado_em: dados.criadoEm.valor
    }
}

export const buscarUsuariosPaginado = async (quantidadePagina, paginaAtual) => {

    // const requisicao = {
    //     quantidadePagina : quantidadePagina,
    //     paginaAtual: paginaAtual
    // }

    return await backEndUtils.chamarBackEnd("GET", "/usuarios").then((response) => {
        if(response.status == 200) {
            return response.json().then((dados) => dados);
        }
    })
}

export const buscarUsuarioPorNome = async (nomeUsuario) => {
    return await backEndUtils.chamarBackEnd("GET", "/usuarios/" + nomeUsuario).then((response) => {
        if(response.status == 200){
            return response.json().then(dados => dados)
        }
    })
}

export const cadastrarUsuario = async (usuario) => {

    return await backEndUtils.chamarBackEnd("POST", "/usuarios/", usuario).then((response) => {
        if(response.status){
            return response.json().then(dados => dados)
        }
    })
}

export const deletarUsuario = async (id) => {

    return await backEndUtils.chamarBackEnd("DELETE", "/usuarios/" + id).then((response) => {
        if(response.status){
            return response.json().then(dados => dados)
        }
    })
}