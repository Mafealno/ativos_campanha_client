/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";

import ModalControle from "../ModalControle/ModalControle";
import EntradaDados from "../EntradaDados/EntradaDados";
import EntradaSelecao from "../EntradaSelecao/EntradaSelecao";
import Opcao from "../EntradaSelecao/Opcao/Opcao";
import Botao from "../Botao/Botao";
import { showToast } from "../ToastControle/ToastControle";

import * as contadorActions from "../../stores/actions/Contador";
import * as validacaoDadosUtils from "../../utils/ValidacaoDados";
import * as usuarioUtils from "../../utils/Usuarios";
import { buscarUsuarioLogado } from "../../utils/Login";

function ModalUsuario(props) {
    const modeloValidacao = validacaoDadosUtils.dadosCampo;

    const [usuarioLogado, setUsuarioLogado] = useState({});
    const [dados, setDados] = useState({
        id: { ...modeloValidacao, valorPadrao: "" },
        nome: { ...modeloValidacao, requerido: true, valorPadrao: "" },
        sobrenome: { ...modeloValidacao, requerido: true, valorPadrao: "" },
        email: { ...modeloValidacao, requerido: true, valorPadrao: "", formato: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
        usuario: { ...modeloValidacao, requerido: true, valorPadrao: "" },
        tipoUsuario: { ...modeloValidacao, requerido: true, },
        senha: { ...modeloValidacao, requerido: true, valorPadrao: "" },
        repetirSenha: { ...modeloValidacao, valorPadrao: "" },
        criadoPor: { ...modeloValidacao, requerido: false, valorPadrao: "", valor: "mafealno" },
        criadoEm: { ...modeloValidacao, requerido: false, valorPadrao: new Date() },
    })

    useEffect(() => {
        setUsuarioLogado(buscarUsuarioLogado());
        if(props.show && props.dados){
            preencherCampos(props.dados);
        }else{
            limparCampos();
        };
    }, [props.show]);

    const preencherCampos = (dadosUsuario) => {
        setDados({
            ...dados, 
            id: {...dados.id, valor: dadosUsuario._id },
            nome: {...dados.nome, valor: dadosUsuario.nome },
            sobrenome: {...dados.sobrenome, valor: dadosUsuario.sobrenome },
            email: {...dados.email, valor: dadosUsuario.email },
            usuario: {...dados.usuario, valor: dadosUsuario.usuario },
            tipoUsuario: {...dados.tipoUsuario, valor: dadosUsuario.permissoes[0] },
            criadoPor: {...dados.criadoPor, valor: dadosUsuario.criado_por },
            criadoEm: {...dados.criadoEm, valor: dadosUsuario.criado_em },
            senha : { ...dados.senha, requerido: false }
        });
    };

    const limparCampos = () => {
        setDados({
            ...dados, 
            id: {...dados.id, valor: dados.id.valorPadrao },
            nome: {...dados.nome, valor: dados.nome.valorPadrao },
            sobrenome: {...dados.sobrenome, valor: dados.sobrenome.valorPadrao },
            email: {...dados.email, valor: dados.email.valorPadrao },
            usuario: {...dados.usuario, valor: dados.usuario.valorPadrao },
            tipoUsuario: {...dados.tipoUsuario, valor: dados.tipoUsuario.valorPadrao },
            criadoPor: {...dados.criadoPor, valor:  dados.criadoPor.valorPadrao },
            criadoEm: {...dados.criadoEm, valor: dados.criadoEm.valorPadrao },
            senha: {...dados.senha, valor: dados.senha.valorPadrao, requerido: true },
        });
    };

    const cadastrarUsuario = () => {

        let houveErro = validacaoDadosUtils.exibirErroCampo(validacaoDadosUtils.validarDados(dados), false);
        
        if(houveErro){
            return
        };

        if(dados.senha.valor !== dados.repetirSenha.valor){
            showToast("erro", "As senhas não coincidem");
            return;
        };

        usuarioUtils.cadastrarUsuario(usuarioUtils.montarUsuario(dados)).then((dados) => {
            if(dados.success){
                props.setContador(props.contador);
                showToast("sucesso", dados.message);
                props.fecharModal();
            }else{
                showToast("erro", dados.message);
            };
        });
    };

    const atualizarUsuario = () => {

        let houveErro = validacaoDadosUtils.exibirErroCampo(validacaoDadosUtils.validarDados(dados), false);

        if(houveErro){
            return;
        };

        usuarioUtils.atualizarUsuario(usuarioUtils.montarUsuario(dados), dados.id.valor).then((dados) => {
            if(dados.success){
                props.setContador(props.contador);
                showToast("sucesso", dados.message);
                props.fecharModal();
            }else{
                showToast("erro", dados.message);
            };
        });
    };

    return (
        <ModalControle 
            {...props}
            tituloModal={"Usuário"}
            tamanhoModal="md"
            conteudoCorpo={
                <>
                    <div className="row">
                        <div className="col">
                            <EntradaDados 
                            tipo="text" 
                            id="nome" 
                            nome="nome" 
                            descricao="Nome"
                            acaoAcionar={()=> ""}
                            valorInicial={dados.nome.valor}
                            valor={(valorEntrada)=> setDados({...dados, nome : { ...dados.nome, valor: valorEntrada.valor}})}/>
                        </div>
                        <div className="col">
                            <EntradaDados 
                            tipo="text" 
                            id="sobrenome" 
                            nome="sobrenome" 
                            descricao="Sobrenome"
                            acaoAcionar={()=> ""}
                            valorInicial={dados.sobrenome.valor}
                            valor={(valorEntrada)=> setDados({...dados, sobrenome: { ...dados.sobrenome, valor: valorEntrada.valor}})}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <EntradaDados 
                            tipo="text" 
                            id="email" 
                            nome="email" 
                            descricao="Email"
                            acaoAcionar={()=> ""}
                            valorInicial={dados.email.valor}
                            valor={(valorEntrada)=> setDados({...dados, email: { ...dados.email, valor: valorEntrada.valor}})}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <EntradaDados 
                            tipo="text" 
                            id="usuario" 
                            nome="usuario" 
                            descricao="Usuário"
                            apenasLeitura={dados.id.valor ? true : false}
                            acaoAcionar={()=> ""}
                            valorInicial={dados.usuario.valor}
                            valor={(valorEntrada)=> setDados({...dados, usuario : { ...dados.usuario, valor: valorEntrada.valor}})}/>
                        </div>
                        <div className="col">
                            <EntradaSelecao 
                            id="tipoUsuario" 
                            nome="tipoUsuario" 
                            descricao="Usuário"
                            apenasLeitura={dados.id.valor == usuarioLogado.id ? true : false }
                            valorInicial={dados.tipoUsuario.valor}
                            valor={(valorEntrada)=> setDados({...dados, tipoUsuario: { ...dados.tipoUsuario, valor: valorEntrada.valor}})}>
                                <Opcao valor="">Escolha uma opção</Opcao>
                                <Opcao valor="Agente">Agente</Opcao>
                                <Opcao valor="Admin">Administrador</Opcao>
                            </EntradaSelecao>
                        </div>
                    </div>
                    {dados.id.valor != usuarioLogado.id && (
                        <div className="row">
                            <div className="col">
                                <EntradaDados 
                                tipo="password" 
                                id="senha" 
                                nome="senha" 
                                descricao="Senha"
                                autoCompletar="new-password"
                                acaoAcionar={()=> ""}
                                valorInicial={dados.senha.valor}
                                valor={(valorEntrada)=> setDados({...dados, senha : { ...dados.senha, valor: valorEntrada.valor}})}/>
                            </div>
                            {!dados.id.valor && 
                                <div className="col">
                                    <EntradaDados 
                                    tipo="password" 
                                    id="repetirSenha" 
                                    nome="repetirSenha" 
                                    descricao="Repita a senha"
                                    autoCompletar="new-password"
                                    acaoAcionar={()=> ""}
                                    valor={(valorEntrada)=> setDados({...dados, repetirSenha: { ...dados.repetirSenha, valor: valorEntrada.valor}})}/>
                                </div>
                            }
                        </div>
                    )}
                </>
            }
            conteudoRodape={
                <>
                    {!dados.id.valor && <Botao estilo={"w-100-px btn-azul"} clique={()=> cadastrarUsuario()}>Salvar</Botao>}
                    {dados.id.valor && <Botao estilo={"w-100-px btn-amarelo"} clique={()=> atualizarUsuario()}>Editar</Botao>}
                </>
            }
        />
    );
};

const mapStateToProps = (state) => ({
    contador: state.Contador.contador,
});

const mapDispatchToProps = (dispatch) => ({
    setContador : (contador) => dispatch(contadorActions.setContador(contador)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalUsuario);
