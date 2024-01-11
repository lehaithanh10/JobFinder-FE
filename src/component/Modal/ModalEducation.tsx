import React from "react";
import { Modal } from "react-bootstrap";
import FormEducation from "../Form/FormEducation";
import { EducationDto } from "../../api/employee";
import { CreateEmployeeEducationDto } from "../../api/employee-education";
interface EducationModalProps {
  title: string;
  children?: any;
  showModal: boolean;
  handleClose: () => void;
  education?: EducationDto | CreateEmployeeEducationDto;
  handleChangeEducation: (event: any) => void;
  submitAddEducation: (event: any) => void;
  submitSaveEducation: (event: any) => void;
}

const ModalEducation = (props: EducationModalProps) => {
  return (
    <div>
      <Modal show={props.showModal} onHide={props.handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEducation
            education={props.education}
            handleChangeEducation={props.handleChangeEducation}
            submitAddEducation={props.submitAddEducation}
            submitSaveEducation={props.submitSaveEducation}
          ></FormEducation>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalEducation;
