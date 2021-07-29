import React from "react";

function Opcao(props) {
    return <option value={props.valor}>{props.children}</option>
};

export default Opcao;
