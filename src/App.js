import { Redirect, Route } from "react-router-dom";
import Rota from "./componentes/Rota/Rota";
import OpcaoMenu from "./componentes/OpcaoMenu/OpcaoMenu";
import MenuAplicativo from "./componentes/MenuAplicativo/MenuAplicativo";
import ItemMenuPrincipal from "./componentes/ItemMenuPrincipal/ItemMenuPrincipal";
import './App.css';
import './EstiloGlobal.css';

function App() {
  return (
    <>
      <Redirect to={{ pathname:"/dashboard" }} />
      <div id="container-app">
        <header id="espaco-cabecalho" className="p-10-px">
          <OpcaoMenu>
            <MenuAplicativo />
          </OpcaoMenu>
        </header>
        <main id="espaco-conteudo">
          <div id="espaco-esquerdo" className="p-10-px"></div>
          <div id="espaco-centro" className="p-10-px">
            <Rota 
            caminho="/dashboard" 
            exigeAutenticacao={false}
            componente={()=> 
            <>
              <ItemMenuPrincipal titulo="Gestão de usuários" acaoExecutar={"/usuarios"}>
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
            <section id="container-telas-renderizar">
              <Route path="/usuarios" render={() => <div>usuarios</div>} />  
              <Route path="/campanhas" render={() => <div>campanhas</div>} />  
              <Route path="/arquivo-retorno" render={() => <div>arquivo-retorno</div>} />  
              <Route path="/limpeza" render={() => <div>limpeza</div>} />  
              <Route path="/saneamento" render={() => <div>saneamento</div>} />  
            </section>    
          </div>
          <div id="espaco-direita" className="p-10-px"></div>
        </main>
        <footer id="espaco-rodape" className="p-10-px">
          
        </footer>
        
      </div>
    </>
  );
}

export default App;
