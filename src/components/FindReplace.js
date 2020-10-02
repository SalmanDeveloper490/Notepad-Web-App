import React, { Fragment,useState } from "react";
import Ckeditor from "./Ckeditor";
import {Button,Modal} from 'react-bootstrap'

const FindReplace = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
      <Ckeditor />
    </Fragment>
  );
};

export default FindReplace;
