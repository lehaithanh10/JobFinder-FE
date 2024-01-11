import React from "react";
import { Modal } from "react-bootstrap";
import FormSkill from "../Form/FormSkill";
import { SkillDto } from "../../api/employee";

interface SkillModalProps {
  title: string;
  children?: any;
  showModal: boolean;
  handleClose: () => void;
  skill?: SkillDto;
  handleChangeSkill: (event: any) => void;
  submitAddSkill: (event: any) => void;
  submitSaveSkill: (event: any) => void;
}

const ModalSkill = (props: SkillModalProps) => {
  return (
    <div>
      <Modal show={props.showModal} onHide={props.handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormSkill
            skill={props.skill}
            handleChangeSkill={props.handleChangeSkill}
            submitAddSkill={props.submitAddSkill}
            submitSaveSkill={props.submitSaveSkill}
          ></FormSkill>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalSkill;
