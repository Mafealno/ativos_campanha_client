import { useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";

import Rota from "./componentes/Rota/Rota";
import Logar from "./componentes/Logar/Logar";
import MenuAplicativo from "./componentes/MenuAplicativo/MenuAplicativo";
import ItemMenuPrincipal from "./componentes/ItemMenuPrincipal/ItemMenuPrincipal";
import TelaGestaoUsuarios from "./componentes/TelaGestaoUsuarios/TelaGestaoUsuarios";
import TelaGestaoCampanhas from "./componentes/TelaGestaoCampanhas/TelaGestaoCampanhas";
import TelaHistoricoArquivoRetorno from "./componentes/TelaHistoricoArquivoRetorno/TelaHistoricoArquivoRetorno";
import TelaHistoricoLimpeza from "./componentes/TelaHistoricoLimpeza/TelaHistoricoLimpeza";
import ToastControle from "./componentes/ToastControle/ToastControle";

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
            componente={()=> <Logar />} />
            <Rota 
            caminho="/dashboard/menu" 
            exigeAutenticacao={true}
            componente={()=> 
            <>
              <ItemMenuPrincipal titulo="Gestão de usuários" acaoExecutar={"/dashboard/usuarios"}>
                Criação de usuários do sistema
              </ItemMenuPrincipal>
              <ItemMenuPrincipal titulo="Gestão de Campanhas" acaoExecutar={"/dashboard/campanhas"}>
                Gerar arquivos de retorno e zerar campanhas
              </ItemMenuPrincipal>
              <ItemMenuPrincipal titulo="Historico de Arquivos de Retorno" acaoExecutar={"/dashboard/arquivo-retorno"}>
                Historico de geração de arquivo de retorno
              </ItemMenuPrincipal>
              <ItemMenuPrincipal titulo="Historico de Limpeza" acaoExecutar={"/dashboard/limpeza"}>
                Historico de limpeza de Campanhas
              </ItemMenuPrincipal>
              <ItemMenuPrincipal titulo="Saneamento de mailing" acaoExecutar={"/dashboard/saneamento"}>
                Regras de Saneamento do processo de importação das campanhas
              </ItemMenuPrincipal>
            </>
            }   
            />
            <section className="w-100-pc">
              <Rota caminho="/dashboard/usuarios" exigeAutenticacao={true} componente={() => <TelaGestaoUsuarios/>} /> 
              <Rota caminho="/dashboard/campanhas" exigeAutenticacao={true} componente={() => <TelaGestaoCampanhas />} />  
              <Rota caminho="/dashboard/arquivo-retorno" exigeAutenticacao={true} componente={() => <TelaHistoricoArquivoRetorno />} />  
              <Rota caminho="/dashboard/limpeza" exigeAutenticacao={true} componente={() => <TelaHistoricoLimpeza />} />  
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
