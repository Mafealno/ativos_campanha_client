const ESTADO_INICIAL = {
    contador: 0,
  };
  
  export default function MenuAplicativo(state = ESTADO_INICIAL, action) {
    switch (action.type) {
        case "SET_CONTADOR":
          return {
            ...state,
            contador: action.contador,
          };
          default:
          return {
              ...state
        }
    }
}