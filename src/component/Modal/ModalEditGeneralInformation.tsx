import React from "react";
import { Modal } from "react-bootstrap";
import FormModalEditGeneralInformation, {
  GeneralInformation,
} from "../Form/FormEditGeneralInformation";
interface ModalEditGeneralInformationModalProps {
  title: string;
  children?: any;
  showModal: boolean;
  handleClose: () => void;
  generalInformation: GeneralInformation;
  handleChangeGeneralInformation: (event: any) => void;
  submitChangeGeneralInformation: (event: any) => void;
}

const ModalEditGeneralInformation = (
  props: ModalEditGeneralInformationModalProps
) => {
  return (
    <div>
      <Modal show={props.showModal} onHide={props.handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormModalEditGeneralInformation
            generalInformation={props.generalInformation}
            handleChangeGeneralInformation={
              props.handleChangeGeneralInformation
            }
            submitChangeGeneralInformation={
              props.submitChangeGeneralInformation
            }
          ></FormModalEditGeneralInformation>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalEditGeneralInformation;
