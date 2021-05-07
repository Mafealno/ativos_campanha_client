/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import ModalControle from "../ModalControle/ModalControle";
import EntradaDados from "../EntradaDados/EntradaDados";
import Botao from "../Botao/Botao";

import * as validacaoDadosUtils from "../../utils/ValidacaoDados";
import * as usuarioUtils from "../../utils/Usuarios";
import { deslogar } from "../../utils/Login";
import { showToast } from "../ToastControle/ToastControle";
import { buscarUsuarioLogado } from "../../utils/Login";

function ModalAlterarSenha(props) {

    const modeloValidacao = validacaoDadosUtils.dadosCampo;

    const [usuarioLogado, setUsuarioLogado] = useState({});
    const [dados, setDados] = useState({
        id: { ...modeloValidacao, valorPadrao: "" },
        senha: { ...modeloValidacao, requerido: true, valorPadrao: "" },
        repetirSenha: { ...modeloValidacao, requerido: true, valorPadrao: "" },
    })

    useEffect(() => {
        setUsuarioLogado(buscarUsuarioLogado());
        if(props.show && props.dados){
            preencherCampos(usuarioLogado);
        }else{
            limparCampos();
        }
    }, [props.show]);

    const preencherCampos = (dadosUsuario) => {
        setDados({
            ...dados, 
            id: {...dados.id, valor: dadosUsuario.id },
        })
    }

    const limparCampos = () => {
        setDados({
            ...dados, 
            id: {...dados.id, valor: dados.id.valorPadrao },
            senha: {...dados.senha, valor: dados.senha.valorPadrao },
            repetirSenha: {...dados.repetirSenha, valor: dados.repetirSenha.valorPadrao },
        })
    }

    const atualizarSenhaUsuario = () => {

        let houveErro = validacaoDadosUtils.exibirErroCampo(validacaoDadosUtils.validarDados(dados), false);

        if(houveErro){
            return
        }

        if(dados.senha.valor !== dados.repetirSenha.valor){
            showToast("erro", "As senhas não coincidem");
            return;
        }

        usuarioUtils.atualizarSenhaUsuario(usuarioUtils.montarUsuario(dados), dados.id.valor).then((dados) => {
            if(dados.success){
                showToast("sucesso", dados.message);
                deslogar();
            }else{
                showToast("erro", dados.message);
            }
        });
    }

    return (
        <ModalControle 
            {...props}
            tituloModal={"Alterar senha"}
            tamanhoModal="sm"
            conteudoCorpo={
                <>
                    <div className="row">
                        <div className="col">
                            <EntradaDados 
                            tipo="password" 
                            id="senha" 
                            nome="senha" 
                            descricao="Senha"
                            acaoAcionar={()=> ""}
                            valorInicial={dados.senha.valor}
                            valor={(valorEntrada)=> setDados({...dados, senha : { ...dados.senha, valor: valorEntrada.valor}})}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <EntradaDados 
                            tipo="password" 
                            id="repetirSenha" 
                            nome="repetirSenha" 
                            descricao="Repita a senha"
                            acaoAcionar={()=> ""}
                            valor={(valorEntrada)=> setDados({...dados, repetirSenha: { ...dados.repetirSenha, valor: valorEntrada.valor}})}/>
                        </div>
                    </div>
                </>
            }
            conteudoRodape={
                <>
                    <Botao estilo={"w-100-px btn-amarelo"} clique={()=> atualizarSenhaUsuario()}>Editar</Botao>
                </>
            }
        />
    )
}

export default ModalAlterarSenha
