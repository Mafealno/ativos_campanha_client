import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Rota from "./componentes/Rota/Rota";
import Permissao from "./componentes/Permissao/Permissao";
import Logar from "./componentes/Logar/Logar";
import MenuAplicativo from "./componentes/MenuAplicativo/MenuAplicativo";
import ItemMenuPrincipal from "./componentes/ItemMenuPrincipal/ItemMenuPrincipal";
import TelaGestaoUsuarios from "./componentes/TelaGestaoUsuarios/TelaGestaoUsuarios";
import TelaGestaoCampanhas from "./componentes/TelaGestaoCampanhas/TelaGestaoCampanhas";
import TelaHistoricoArquivoRetorno from "./componentes/TelaHistoricoArquivoRetorno/TelaHistoricoArquivoRetorno";
import TelaHistoricoLimpeza from "./componentes/TelaHistoricoLimpeza/TelaHistoricoLimpeza";
import TelaGerenciamentoLimites from './componentes/TelaGerenciamentoLimites/TelaGerenciamentoLimites';
import ToastControle from "./componentes/ToastControle/ToastControle";

import './App.css';
import './EstiloGlobal.css';

function App() {

  const historico = useHistory();

    useEffect(() => {
      if(historico){
        if(historico.location.pathname === "/" || historico.location.pathname === "/dashboard"){
          historico.push("/login");
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
            <Rota caminho="/login" exigeAutenticacao={false} componente={()=> <Logar />} />
            <div id="container-menu-principal">
              <Rota caminho="/dashboard/menu" exigeAutenticacao={true} componente={()=> 
              <>
                <Permissao nome="TelaGestaoUsuarios" componente={() => <ItemMenuPrincipal titulo="Gestão de usuários" descricao="Criação de usuários do sistema" acaoExecutar={"/dashboard/usuarios"} /> } />
                <Permissao nome="TelaGestaoCampanhas" componente={() => <ItemMenuPrincipal titulo="Gestão de Campanhas" descricao="Gerar arquivos de retorno e zerar campanhas" acaoExecutar={"/dashboard/campanhas"} /> } />
                <Permissao nome="TelaHistoricoArquivoRetorno" componente={() => <ItemMenuPrincipal titulo="Historico de Arquivos de Retorno" descricao="Historico de geração de arquivo de retorno" acaoExecutar={"/dashboard/arquivo-retorno"} /> } />
                <Permissao nome="TelaHistoricoLimpeza" componente={() => <ItemMenuPrincipal titulo="Historico de Limpeza" descricao="Historico de limpeza de Campanhas" acaoExecutar={"/dashboard/limpeza"} /> } />
                <Permissao nome="TelaSaneamentoMailing" componente={() => <ItemMenuPrincipal titulo="Saneamento de mailing" descricao="Regras de Saneamento do processo de importação das campanhas" acaoExecutar={"/dashboard/saneamento"} /> } />
                <Permissao nome="TelaGerenciamentoLimites" componente={() => <ItemMenuPrincipal titulo="Gerenciamento de Limites" descricao="Editar valores dos limites" acaoExecutar={"/dashboard/limites"} /> } />
              </>
              }   
              />
            </div>
            <section className="w-100-pc">
              <Rota nome="UrlGestaoUsuarios" caminho="/dashboard/usuarios" exigeAutenticacao={true} componente={() => <TelaGestaoUsuarios/>} /> 
              <Rota nome="UrlGestaoCampanhas" caminho="/dashboard/campanhas" exigeAutenticacao={true} componente={() => <TelaGestaoCampanhas />} />  
              <Rota nome="UrlHistoricoArquivoRetorno" caminho="/dashboard/arquivo-retorno" exigeAutenticacao={true} componente={() => <TelaHistoricoArquivoRetorno />} />  
              <Rota nome="UrlHistoricoLimpeza" caminho="/dashboard/limpeza" exigeAutenticacao={true} componente={() => <TelaHistoricoLimpeza />} />  
              <Rota nome="UrlSaneamentoMailing" caminho="/dashboard/saneamento" exigeAutenticacao={true} componente={() => <div>saneamento</div>} />  
              <Rota nome="UrlGerenciamentoLimites" caminho="/dashboard/limites" exigeAutenticacao={true} componente={() => <TelaGerenciamentoLimites />} />  
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
