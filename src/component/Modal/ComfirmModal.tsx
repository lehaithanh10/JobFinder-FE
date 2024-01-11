import React from "react";
import { Modal, Button } from "react-bootstrap";
import { MdOutlineDangerous } from "react-icons/md";
import { EResource } from "../../pages/Employee/NewProfile/NewProfile";

interface ConfirmationModalProps {
  showModal: boolean;
  title: string;
  choosenToDeleteResource?: { type?: EResource; id: string; name?: string };
  handleClose: () => void;
  handleDeleteResource: (event: any) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  showModal,
  title,
  handleClose,
  choosenToDeleteResource,
  handleDeleteResource,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`${title}${
          choosenToDeleteResource?.name
            ? `: ${choosenToDeleteResource?.name}`
            : ""
        }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 d-flex flex-column align-items-center">
        <MdOutlineDangerous style={{ color: "red" }} size={84} />
        <h4 className="modal-title w-100 text-center">Are you sure?</h4>
        <p
          className="px-5 py-3 text-center"
          style={{ fontSize: "18px", color: "gray" }}
        >
          Do you really want to delete these records? This process cannot be
          undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => handleDeleteResource(choosenToDeleteResource)}
          variant="danger"
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
