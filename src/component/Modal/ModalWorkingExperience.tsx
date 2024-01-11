import React from "react";
import { Modal } from "react-bootstrap";
import FormAddWorkingExperience from "../Form/FormWorkingExperience";
import { WorkingExperienceDto } from "../../api/employee";
interface WorkingExperienceModalProps {
  title: string;
  children?: any;
  showModal: boolean;
  handleClose: () => void;
  workingExperience?: WorkingExperienceDto;
  handleChangeWorkingExperience: (event: any) => void;
  submitAddWorkingExperience: (event: any) => void;
  submitSaveWorkingExperience: (event: any) => void;
}

const ModalWorkingExperience = (props: WorkingExperienceModalProps) => {
  return (
    <div>
      <Modal show={props.showModal} onHide={props.handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddWorkingExperience
            workingExperience={props.workingExperience}
            handleChangeWorkingExperience={props.handleChangeWorkingExperience}
            submitAddWorkingExperience={props.submitAddWorkingExperience}
            submitSaveWorkingExperience={props.submitSaveWorkingExperience}
          ></FormAddWorkingExperience>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalWorkingExperience;
