const ESTADO_INICIAL = {
    usuarioLogado: {}
  };
  
  export default function LoginReducer(state = ESTADO_INICIAL, action) {
    switch (action.type) {
      case "SET_USUARIO_LOGADO":
        return {
          ...state,
          usuarioLogado: action.usuarioLogado,
        };
        default:
        return {
            ...state
        }
      }
  }
  