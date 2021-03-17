import React from "react";
import Botao from "../Botao/Botao";
import { Link } from "react-router-dom";
import "./ItemMenuPrincipal.css";

function ItemMenuPrincipal(props) {
    return (
        <div id="container-item-menu-principal">
            <header>
                {props.titulo}
            </header>
            <div>
                {props.children}
            </div>
            <footer>
                <Link to={props.acaoExecutar}>
                    <Botao estilo={"h-100-pc w-100-pc btn-primary"}>
                        Entrar
                    </Botao>
                </Link>
            </footer>
        </div>
    )
}

export default ItemMenuPrincipal