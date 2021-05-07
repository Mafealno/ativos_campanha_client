import React from 'react'

import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import * as permissaoUtils from "../../utils/Permissao";
import * as loginUtils from "../../utils/Login"

import store from "../../stores/store";

const RotaPrivada = ({...rest}) => {
  

    return <Route {...rest} render={props => 
        loginUtils.usuarioLogado(rest.exigeAutenticacao) && 
        permissaoUtils.validaPermissao(rest.nome) ? <Provider store={store}><rest.componente {...props} /></Provider>
        :
        <Redirect to={{ pathname:"/login" }} />
    }
    />
}

function Rota(props){
    return (
        <Switch>
            <RotaPrivada path={props.caminho} {...props} />
        </Switch>
    )
}

export default Rota
