import React from "react";
import { toast, ToastContainer } from 'react-toastify';

import "./ToastControle.css";
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (tipo, mensagem ) => {
  switch (tipo) {
    case 'sucesso':
      toast.success(mensagem);
      break;
    case 'aviso':
      toast.warn(mensagem);
      break;
    case 'erro':
      toast.error(mensagem);
      break;
    default:
      toast(mensagem);
      break;
  };
};
function ToastControle() {
  return <ToastContainer />;
};

export default ToastControle;