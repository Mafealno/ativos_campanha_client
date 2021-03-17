/* eslint-disable eqeqeq */
import * as backEndUtils from "./BackEnd";

export const usuarioLogado = async (exigeAutenticacao) => {
    
    if(exigeAutenticacao){
        return await backEndUtils.chamarBackEnd("GET", "/login/logado", "").then((response)=>{
            if(response.status == 200){
                return true;
            }else{
                return false
            }
        })
    }else{
        return true
    }
}