/* eslint-disable eqeqeq */
import { deslogar } from "./Login";
const linkBackEnd = process.env.REACT_APP_API_URL;


export const chamarBackEnd = async (metodo, caminho, corpo) => {

    if(corpo){
        return await fetch(linkBackEnd + '/api' + caminho, {
            method: metodo,
            credentials: 'include',
            headers: { 
                "Content-Type": "application/json",
                },
            body: JSON.stringify(corpo),
            }).then((resposta) =>  {
                if(resposta.status == 401){
                    deslogar();
                }
                return resposta;
        }).catch((erro)=>{
            return erro
        })
    }else{
        return await fetch(linkBackEnd + '/api' + caminho, {
            method: metodo,
            credentials: 'include',
            headers: { 
                "Content-Type": "application/json",
                },
            }).then((resposta) =>  {
                if(resposta.status == 401){
                    deslogar();
                }
                return resposta;
            }).catch((erro)=>{
                return erro
            })
        }
  };

  export const tratarRetorno = async (resposta) => {
        switch(resposta.status){
            case "200":
                return resposta.json().then((dados) => dados);
            default:
                return resposta
      }
  }