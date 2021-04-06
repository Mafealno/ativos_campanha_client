import dayjs from "dayjs";

export const formatarData = (data) => {
    const dataDayJs = dayjs(data);

    return formartarDoisDigitos(dataDayJs.day()) + "/" + formartarDoisDigitos(dataDayJs.month()) + "/" + dataDayJs.year()
}

export const formartarDoisDigitos = (valor) => {
    return valor.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
}