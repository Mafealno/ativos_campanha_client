import { useEffect } from 'react';
import { Redirect, Route, useHistory } from "react-router-dom";

import Rota from "./componentes/Rota/Rota";
import MenuAplicativo from "./componentes/MenuAplicativo/MenuAplicativo";
import ItemMenuPrincipal from "./componentes/ItemMenuPrincipal/ItemMenuPrincipal";
import TelaGestaoUsuarios from "./componentes/TelaGestaoUsuarios/TelaGestaoUsuarios";
import ToastControle from "./componentes/ToastControle/ToastControle";
import Login from "./componentes/Login/Login";

import './App.css';
import './EstiloGlobal.css';

function App() {

  const historico = useHistory();

    useEffect(() => {
      if(historico){
        if(historico.location.pathname === "/" || historico.location.pathname === "/dashboard"){
          <Redirect to={{ pathname: "/dashboard/menu" }} />
        }
      }
    }, [historico])

  return (
    <>
      <div id="container-app">
        <header id="espaco-cabecalho" className="p-10-px">
        <Rota
          caminho="/dashboard"
          exigeAutenticacao={true}
          componente={()=> <MenuAplicativo />}
          />
        </header>
        <main id="espaco-conteudo">
          <div id="espaco-esquerdo" className="p-10-px"></div>
          <div id="espaco-centro" className="p-10-px">
            <Rota
            caminho="/login"
            exigeAutenticacao={false}
            componente={()=> <Login />} />
            <Rota 
            caminho="/dashboard/menu" 
            exigeAutenticacao={true}
            componente={()=> 
            <>
              <ItemMenuPrincipal titulo="Gestão de usuários" acaoExecutar={"/dashboard/usuarios"}>
                Criação de usuários do sistema
              </ItemMenuPrincipal>
              <ItemMenuPrincipal titulo="Gestão de Campanhas" acaoExecutar={"/campanhas"}>
                Gerar arquivos de retorno e zerar campanhas
              </ItemMenuPrincipal>
              <ItemMenuPrincipal titulo="Historico de Arquivos de Retorno" acaoExecutar={"/arquivo-retorno"}>
                Historico de geração de arquivo de retorno
              </ItemMenuPrincipal>
              <ItemMenuPrincipal titulo="Historico de Limpeza" acaoExecutar={"/limpeza"}>
                Historico de limpeza de Campanhas
              </ItemMenuPrincipal>
              <ItemMenuPrincipal titulo="Saneamento de mailing" acaoExecutar={"/saneamento"}>
                Regras de Saneamento do processo de importação das campanhas
              </ItemMenuPrincipal>
            </>
            }   
            />
            <section className="w-100-pc">
              <Rota caminho="/dashboard/usuarios" exigeAutenticacao={true} componente={() => <TelaGestaoUsuarios/>} /> 
              <Rota caminho="/dashboard/campanhas" exigeAutenticacao={true} componente={() => <div>campanhas</div>} />  
              <Rota caminho="/dashboard/arquivo-retorno" exigeAutenticacao={true} componente={() => <div>arquivo-retorno</div>} />  
              <Rota caminho="/dashboard/limpeza" exigeAutenticacao={true} componente={() => <div>limpeza</div>} />  
              <Rota caminho="/dashboard/saneamento" exigeAutenticacao={true} componente={() => <div>saneamento</div>} />  
            </section>    
          </div>
          <div id="espaco-direita" className="p-10-px"></div>
        </main>        
      </div>
      <ToastControle />
    </>
  );
}

export default App;
