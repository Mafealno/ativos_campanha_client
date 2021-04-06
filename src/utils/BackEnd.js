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
            return resposta
        })
    }else{
        return await fetch(linkBackEnd + '/api' + caminho, {
            method: metodo,
            credentials: 'include',
            headers: { 
                "Content-Type": "application/json",
                },
            }).then((resposta) =>  {
                return resposta
            }).catch((erro)=>{
                return erro
            })
        }
  };