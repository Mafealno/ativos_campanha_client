/* eslint-disable array-callback-return */
export const validarDados = (dadosValidacao) => {
    const objAux = Object.assign({}, dadosValidacao);
  
    Object.keys(objAux).map((campo) => {
      objAux[campo].valido = false;
      if(objAux[campo].requerido){
        if (objAux[campo].valor){
          if (objAux[campo].formato) {
            if (objAux[campo].valor.toString().match(objAux[campo].formato)) {
              objAux[campo].valido = true;
            } else {
              objAux[campo].msgErro = "Formato inválido";
            }
          } else {
            objAux[campo].valido = true;
          }
        }else {
          objAux[campo].msgErro = "Preencha esta informação";
        }
      }else{
        if(!objAux[campo].valor){
          objAux[campo].valor = objAux[campo].valorPadrao;
        }
        objAux[campo].valido = true;
      }
    });
  
    return objAux;
  }

  export const exibirErroCampo = (dados, houveErro) => {
    Object.keys(dados).map((nomeCampo) => {
      if (!dados[nomeCampo].valido) {
        houveErro = true;

        if(document.getElementById("campo-" + nomeCampo)) {
          const containerErro = document.getElementById("erro-" + nomeCampo);
          containerErro.innerHTML = dados[nomeCampo].msgErro;
          containerErro.style.display = "block";
          document.getElementById("campo-" + nomeCampo).classList.add("is-invalid");
        }
      }
    });
    return houveErro;
  };

  export const removerErroCampo = (id) => {
    const containerErro = document.getElementById("erro-" + id);
    containerErro.innerHTML = ""
    containerErro.style.display = "none";
    document.getElementById("campo-" + id).classList.remove("is-invalid");
  };
  
  export const dadosCampo = {
    valor: "",
    valorPadrao: "",
    requerido: false,
    formato: "",
    msgErro: "",
    valido: false,
    tamanhoMax: 9999,
  };