const ESTADO_INICIAL = {
    showJanelaSuspensa: false,
  };
  
  export default function MenuAplicativo(state = ESTADO_INICIAL, action) {
    switch (action.type) {
        case "SET_SHOW_JANELA_SUSPENSA":
          return {
            ...state,
            showJanelaSuspensa: action.showJanelaSuspensa,
          };
          default:
          return {
              ...state
        }
    }
}
