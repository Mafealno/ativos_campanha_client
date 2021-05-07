/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";

export const montarUsuario = (dados) => {
    return {
        usuario: dados.usuario.valor || undefined,
        nome: dados.nome.valor || undefined,
        sobrenome: dados.sobrenome.valor || undefined,
        email: dados.email.valor,
        senha: dados.senha.valor || undefined,
        permissoes: [ dados.tipoUsuario.valor ] || [],
        criado_por: dados.criadoPor.valor || undefined,
        criado_em: dados.criadoEm.valor || undefined
    }
}

export const buscarUsuariosPaginado = async (quantidadePagina, paginaAtual) => {

    const requisicao = {
        quantidadePagina : quantidadePagina,
        paginaAtual: paginaAtual
    }

    return await backEndUtils.chamarBackEnd("POST", "/usuarios", requisicao).then((resposta) => {
        if(resposta.status == 200) {
            return resposta.json().then((dados) => dados);
        }
    })
}

export const buscarUsuarioPorNomePagina = async (nomeUsuario, quantidadePagina) => {

    const requisicao = {
        nomeUsuario: nomeUsuario,
        quantidadePagina : quantidadePagina,
        paginaAtual: 0
    }

    return await backEndUtils.chamarBackEnd("POST", "/usuarios/findbyname", requisicao).then((resposta) => {
        if(resposta.status == 200){
            return resposta.json().then(dados => dados)
        }
    })
}

export const buscarUsuarioPorId = async (idUsuario) => {
    return await backEndUtils.chamarBackEnd("GET", "/usuarios/" + idUsuario).then((resposta) => {
        if(resposta.status == 200){
            return resposta.json().then(dados => {
                if(dados.success){
                    return dados.data;
                }else{
                    return {
                       _id: idUsuario,
                       nome: ""
                    }
                }
            })
        }
    })
}

export const cadastrarUsuario = async (usuario) => {

    return await backEndUtils.chamarBackEnd("POST", "/usuarios/", usuario).then((resposta) => {
        if(resposta.status){
            return resposta.json().then(dados => dados)
        }
    })
}

export const atualizarUsuario = async (usuario, id) => {

    return await backEndUtils.chamarBackEnd("PUT", "/usuarios/" + id, usuario).then((resposta) => {
        if(resposta.status){
            return resposta.json().then(dados => dados)
        }
    })
}

export const atualizarSenhaUsuario = async (usuario, id) => {

    return await backEndUtils.chamarBackEnd("PUT", "/usuarios/senha/" + id, usuario).then((resposta) => {
        if(resposta.status){
            return resposta.json().then(dados => dados)
        }
    })
}

export const deletarUsuario = async (id) => {

    return await backEndUtils.chamarBackEnd("DELETE", "/usuarios/" + id).then((resposta) => {
        if(resposta.status){
            return resposta.json().then(dados => dados)
        }
    })
}