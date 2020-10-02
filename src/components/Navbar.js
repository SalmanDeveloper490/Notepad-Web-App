import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Modal, Button, Form } from "react-bootstrap";

const TopNavbar = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand to="/">NOTEPAD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto text-uppercase">
            <NavDropdown title="File" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/" target="_blank">
                New
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#" onClick={props.saveFile}>
                Save
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="#" onClick={handleShow}>
              Find And Replace
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* popup modal */}
      <Modal show={show} onHide={handleClose} className="hide-modal">
        <Modal.Header closeButton>
          <Modal.Title>Find And Replace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Find What</Form.Label>
            <Form.Control
              type="text"
              placeholder="Find What"
              name="find"
              onChange={props.find}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Replace</Form.Label>
            <Form.Control
              type="text"
              placeholder="Replace"
              onChange={props.replace}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={props.findTextHandler}
            className="mr-2 findButton"
          >
            Find
          </Button>
          <Button
            variant="primary"
            className="replaceButton"
            onClick={props.replaceTextHandler}
          >
            Replace
          </Button>
        </Modal.Body>
      </Modal>
      {/* popup modal */}
    </Fragment>
  );
};

export default TopNavbar;
