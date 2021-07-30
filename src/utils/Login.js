/* eslint-disable eqeqeq */
import Cookies from "js-cookie"; 
const linkBackEnd = process.env.REACT_APP_API_URL;

export const usuarioLogado = (exigeAutenticacao) => {
    
    if(exigeAutenticacao){
       const token = Cookies.get('X-JWT-Token');

       if(token){
           return true
       }else{
           return false
       }
    }else{
        return true
    }
}

export const deslogar = (historico) => {
    Cookies.remove('X-JWT-Token');
    localStorage.removeItem("usuarioLogado");

    if(historico){
        historico.push("/login");
    }
}

export const logar = async (usuario, senha) => {

    if(!usuario || !senha){
        return {
            status: 401,
            message: "Usuário e/ou senha não preenchidos"
        }
    }

    // 3 horas
    const tempoExpiracaoCookieToken = 0.125;

    const requisicao = {
        id: "",
        usuario: usuario,
        senha: senha,
        email: "",
        nome: "",
        sobrenome: "",
    }
    
    return await fetch(linkBackEnd + "/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                },
            body: JSON.stringify(requisicao),
            })
            .then((resposta) => resposta.json()
            .then(dados => {
                if(dados.status == 200){
                    Cookies.set("X-JWT-Token", dados.data.token, { expires: tempoExpiracaoCookieToken } ); 
                    localStorage.setItem("usuarioLogado", JSON.stringify(dados.data.user_data));
                }
                return dados;
            }))
}

export const buscarUsuarioLogado = () => {
   return JSON.parse(localStorage.getItem('usuarioLogado'))
}