import React from "react";
import { Link } from "react-router-dom";

import Botao from "../Botao/Botao";

function BotaoVoltarMenu() {
    return (
        <Link to="/dashboard/menu">
            <Botao estilo="centralizar btn-azul">
                <i className="fa fa-arrow-left"/>
            </Botao>
        </Link>
    );
};

export default BotaoVoltarMenu
