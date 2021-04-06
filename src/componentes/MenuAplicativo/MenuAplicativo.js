/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import * as loginUtils from "../../utils/Login"; 

import "./MenuAplicativo.css";

function MenuAplicativo() {

    const [usuario, setUsuario] = useState({});
    const [showJanelaSuspensa, setShowJanelaSuspensa] = useState(false);

    useEffect(() => {
        if (showJanelaSuspensa) {
          window.addEventListener("click", listenerClick);
        }
      }, [showJanelaSuspensa]);

      const listenerClick = () => {
        window.removeEventListener("click", listenerClick);
        setShowJanelaSuspensa(false);
      };

    return (
        <div id="container-menu-aplicativo">
            <div className="nome-empresa">Ativos S.A.</div>
            <div className="opcoes-menu ">
                <span onClick={()=> setShowJanelaSuspensa(true)}>
                    {usuario.nome || "Usuário"}
                    <i className="dropdown-toggle ml-3"></i>
                </span>
            </div>
            <div id="janela-suspensa" className={ showJanelaSuspensa ? "mostrar" : "esconder"}>
                <Link to="/dashboard/menu"><div><i className="fa fa-list mr-3"></i>Dashboard</div></Link>
                <Link to="/"><div><i className="fa fa-gears mr-3"></i>Alterar minha senha</div></Link>
                <Link to="/login"><footer onClick={()=> loginUtils.deslogar()}><i className="fa fa-sign-out mr-3"></i>Sair</footer></Link>
            </div>
        </div>
    )
}

export default MenuAplicativo
