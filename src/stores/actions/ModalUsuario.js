export function setContador(contador) {
    return {
      type: "SET_CONTADOR",
      contador: contador + 1,
    };
  }