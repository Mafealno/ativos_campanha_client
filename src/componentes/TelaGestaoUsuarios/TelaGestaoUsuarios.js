/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";

import EntradaDados from "../EntradaDados/EntradaDados";
import Botao from "../Botao/Botao";
import Paginacao from "../Paginacao/Paginacao";
import Carregando from "../Carregando/Carregando";
import Tabela from "../Tabela/Tabela";
import Linha from "../Linha/Linha";
import Coluna from "../Coluna/Coluna";
import ModalUsuario from "../ModalUsuario/ModalUsuario";
import ModalConfirmacao from "../ModalConfirmacao/ModalConfirmacao";

import * as usuariosUtils from "../../utils/Usuarios";
import * as geralUtils from "../../utils/Geral";
import { showToast } from "../ToastControle/ToastControle";
import { buscarUsuarioLogado } from "../../utils/Login";

import "./TelaGestaoUsuarios.css";
import BotaoVoltarMenu from "../BotaoVoltarMenu/BotaoVoltarMenu";

function TelaGestaoUsuarios(props) {

    const [listaUsuariosExibicao, setListaUsuariosExibicao] = useState([]);
    const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [showModalUsuario, setShowModalUsuario] = useState(false);
    const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
    const [dadosEdicao, setDadosEdicao] = useState({});
    const [idDeletar, setIdDeletar] = useState(0);
    const [list, setList] = useState([]);
    const [valorBuscaUsuario, setValorBuscaUsuario] = useState("");
    const [configPaginado, setConfigPaginado] = useState({
        quantidadePagina: 10,
        paginaAtual: 0
    })

    useEffect(() => {
        usuariosUtils.buscarUsuariosPaginado(configPaginado.quantidadePagina, configPaginado.paginaAtual).then((dados) => {
            setList(dados);
        });
    }, [configPaginado.paginaAtual, props.contador]);

    useEffect(() => {
        if(list){
            if(list.success){
                montarListaUsuarios(list.data);
            }else{
                showToast('erro', list.message);
            }
        }
       setCarregando(false);
    }, [list]);

    useEffect(() => {
        if(!showModalUsuario){
            setDadosEdicao(undefined);
        }
    }, [showModalUsuario]);

    const abrirModalUsuario = (dadosEdicao) => {
        if(dadosEdicao){
            setDadosEdicao(dadosEdicao)
        }
        setShowModalUsuario(true);
    }

    const montarListaUsuarios = (dados) => {

        const usuarioLogado = buscarUsuarioLogado();

        setListaUsuariosExibicao(dados.usuarios.map(item => {
            return (
                <Linha>
                    <Coluna tamanho="120">{item.usuario}</Coluna>
                    <Coluna tamanho="200">{item.nome + " " + item.sobrenome}</Coluna>
                    <Coluna tamanho="280">{item.email}</Coluna>
                    <Coluna tamanho="100">{item.permissoes}</Coluna>
                    <Coluna tamanho="100">{geralUtils.formatarData(item.criado_em)}</Coluna>               
                    <Coluna>
                        <Botao estilo={"w-100-pc btn-amarelo"} clique={()=> abrirModalUsuario(item)}>
                            Editar
                        </Botao>
                    </Coluna>
                    {usuarioLogado.id != item._id && (
                        <Coluna>
                            <Botao estilo={"w-100-pc btn-vermelho"} clique={()=> setIdDeletar(item._id, setShowModalConfirmacao(true))}>
                                Excluir
                            </Botao>
                        </Coluna>
                    )}
                </Linha>
            )
        }));

        if(dados.totalRegistros <= configPaginado.quantidadePagina){
            setPaginacaoExibicao(<></>)
        }else{
            setPaginacaoExibicao(
                <Paginacao 
                quantidadePagina={configPaginado.quantidadePagina} 
                totalRegistros={dados.totalRegistros} 
                paginaAtual={(paginaSelecionada) => setConfigPaginado({...configPaginado, paginaAtual: paginaSelecionada})}
                setCarregando={(bool) => setCarregando(bool)}
                />)
        }

        setCarregando(false);
    }

    const deletarUsuario = (id) => {

        usuariosUtils.deletarUsuario(id).then((dados)=> {
            if(dados.success){
                showToast("sucesso", dados.message);
            }else{
                showToast("erro", dados.message);
            }
        })
    }

    return (
        <>
        <div id="container-tela-gestao-usuarios">
            <header id="cabecalho-tela-gestao-usuarios" className="p-10-px">
                <BotaoVoltarMenu />
                <h2 className="ml-2">Gestão de usuários</h2>
            </header>
            <main id="conteudo-tela-gestao-usuarios" className="p-10-px">
                <div className="d-flex flex-wrap">
                    <div className="col-4" />
                    <div className="flex-grow-1">
                        <section className="sessao-conteudo-tela-gestao-usuarios row">
                            <div className="col-5">
                                <EntradaDados 
                                tipo="text" 
                                id="buscar-usuario" 
                                nome="buscar-usuario" 
                                descricao="Digite o nome do usuário" 
                                valor={(valorEntrada)=> setValorBuscaUsuario(valorEntrada.valor)}/>
                            </div>
                            <div className="col">
                                <Botao estilo={"w-100-pc btn-azul"} clique={()=> usuariosUtils.buscarUsuarioPorNomePagina(valorBuscaUsuario, configPaginado.quantidadePagina).then(dados => setList(dados))}>
                                    Buscar
                                </Botao>
                            </div>
                            <div className="col">
                                <Botao estilo={"w-100-pc btn-verde"} clique={()=> abrirModalUsuario()}>
                                    Novo
                                </Botao>
                            </div>
                            <div className="col">
                            <Botao estilo={"w-100-pc btn-laranja"} clique={()=> ""}>
                                CSV <i className="fa fa-arrow-down"/>
                            </Botao>
                            </div>
                        </section>

                    </div>
                </div>
                <section className="sessao-conteudo-tela-gestao-usuarios">
                    <div>
                        <Tabela tamanho="450">
                            <Linha titulo={true}>
                                <Coluna tamanho="120">Usuário</Coluna>
                                <Coluna tamanho="200">Nome</Coluna>
                                <Coluna tamanho="280">Email</Coluna>
                                <Coluna tamanho="100">Permissão</Coluna>
                                <Coluna tamanho="100">Criação</Coluna>
                                <Coluna>Ações</Coluna>
                            </Linha>
                            {!carregando && listaUsuariosExibicao}
                            {carregando && <Carregando />}
                        </Tabela>
                    </div>
                    {paginacaoExibicao}
                </section>
            </main>
        </div>
        <ModalUsuario 
            show={showModalUsuario}
            fecharModal={()=> setShowModalUsuario(false)}
            dados={dadosEdicao}
        />
        <ModalConfirmacao 
        show={showModalConfirmacao}
        fecharModal={()=>setShowModalConfirmacao(false)}
        tituloModalConfirmacao="Essa ação é irreversivel"
        acaoConfirmada={()=> deletarUsuario(idDeletar)} 
        />
        </>
    )
}

const mapStateToProps = (state) => ({
    contador: state.ModalUsuario.contador,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TelaGestaoUsuarios);
