import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ModalProps {
  title: string;
  handleClose: any;
  children?: any;
}


const ModalContent = (props: ModalProps) => {
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </div>
  );
};

export default ModalContent;
