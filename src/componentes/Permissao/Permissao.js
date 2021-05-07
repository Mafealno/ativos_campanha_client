/* eslint-disable eqeqeq */
import React from 'react'

import * as permissaoUtils from "../../utils/Permissao";

function Permissao(props) {

    const RederizarComponente = ({...rest}) => {

        if(permissaoUtils.validaPermissao(rest.nome)){
            return <rest.componente {...props} />;
        }else{
            return <></>;
        }        
    }

    return (
        <RederizarComponente {...props} />
    )
}

export default Permissao;
