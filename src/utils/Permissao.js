/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import listaPermissoes from "../config/permissoes.json";
import { buscarUsuarioLogado } from "../utils/Login";

export const buscarPermissao = (nome) => {
    
    return listaPermissoes.find((item) => {
        if(item.nome == nome){
             return item;
        }else{
            return undefined
        }
    })
} 

export const validaPermissao = (nome, ) =>{
    const permissao = buscarPermissao(nome);
    const usuarioLogado = buscarUsuarioLogado();
    
    if(permissao){
        if(permissao.usuarios.find((item) => item == usuarioLogado.permissoes && permissao.visualizar ? true : false)){
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    }
}