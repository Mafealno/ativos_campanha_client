/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import "./ModalControl.css";

function ModalControle(props) {
  return (
    <>
      <Modal
        show={props.show}
        size={props.tamanhoModal || "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        className={props.estiloModal}
        onHide={()=> props.onHide()}
        centered
      >
        <ModalHeader className={props.estiloModalHeader}>
          <ModalTitle>{props.tituloModal}</ModalTitle>
          {props.conteudoHeader || (
            <div className="fechar-modal">
              <a href="#" onClick={() => props.onHide()}>
                <span className="fa fa-close fechar-modal" />
              </a>
            </div>
          )}
        </ModalHeader>
        <ModalBody className={props.estiloModalBody}>
          {props.conteudoBody}
        </ModalBody>
        {props.conteudoFooter && (
          <>
            <ModalFooter className={props.estiloModalFooter}>
              {props.conteudoFooter}
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  );
}

export default ModalControle;
