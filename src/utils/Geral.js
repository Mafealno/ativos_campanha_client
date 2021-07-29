/* eslint-disable eqeqeq */
import dayjs from "dayjs";

export const formatarData = (data) => {
    const dataDayJs = dayjs(data);

    return dataDayJs.format('DD/MM/YYYY');
}

export const formatarDataHora = (data, horasAdd) => {
    
    let dataDayJs = dayjs(data)

    if(horasAdd){
        dataDayJs = dataDayJs.add(horasAdd, 'hour');
    }

    return dataDayJs.format('DD/MM/YYYY HH:mm');
}

export const formartarDoisDigitos = (valor) => {
    return valor.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
}