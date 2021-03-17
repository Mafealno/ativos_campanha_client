export const linkBackEnd = process.env.REACT_APP_API_URL;

export const chamarBackEnd = async (
    metodo, 
    caminho, 
    corpo) => {
        
    let tokenAutenticacao = localStorage.getItem("tokenAutenticacao")

    if(tokenAutenticacao){
        tokenAutenticacao = atob(tokenAutenticacao)
    }

    if(corpo){
        return await fetch(linkBackEnd + caminho, {
            method: metodo,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenAutenticacao
                },
            body: JSON.stringify(corpo),
            }).then((resposta) =>  {
            return resposta
        })
    }else{
        return await fetch(linkBackEnd + caminho, {
            method: metodo,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenAutenticacao
                },
            }).then((resposta) =>  {
            return resposta
            }).catch((error)=>{
                return error
            })
        }
  };