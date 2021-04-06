/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

import "./ModalControle.css";

function ModalControle(props) {
  return (
    <>
      <Modal
        show={props.show}
        size={props.tamanhoModal || "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        className={props.estiloModal}
        onHide={()=> props.fecharModal()}
        centered
      >
        <ModalHeader className={props.estiloModalCabecalho}>
          <ModalTitle className={props.estiloTitulo}>{props.tituloModal}</ModalTitle>
          {props.conteudoCabecalho || (
            <div className="fechar-modal">
              <a href="#" onClick={() => props.fecharModal()}>
                <span className="fa fa-close fechar-modal" />
              </a>
            </div>
          )}
        </ModalHeader>
        <ModalBody className={props.estiloModalCorpo}>
          {props.conteudoCorpo}
        </ModalBody>
        {props.conteudoRodape && (
          <>
            <ModalFooter className={props.estiloModalRodape}>
              {props.conteudoRodape}
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  );
}

export default ModalControle;
