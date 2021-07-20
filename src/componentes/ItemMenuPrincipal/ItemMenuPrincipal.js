import React from "react";
import Botao from "../Botao/Botao";
import { Link } from "react-router-dom";
import "./ItemMenuPrincipal.css";

function ItemMenuPrincipal(props) {
    return (
        <div className="container-item-menu-principal">
            <header>
                {props.titulo}
            </header>
            <div>
                {props.descricao}
            </div>
            <footer>
                <Link to={props.acaoExecutar}>
                    <Botao estilo={"h-100-pc w-100-pc btn-azul"}>
                        Entrar
                    </Botao>
                </Link>
            </footer>
        </div>
    )
}

export default ItemMenuPrincipal
