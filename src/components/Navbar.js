import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Modal, Button, Form } from "react-bootstrap";

const TopNavbar = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand to="/">NOTEPAD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto text-uppercase">
            <NavDropdown title="File" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/" target="_blank">
                New
              </NavDropdown.Item>
              <div className="upload-btn-wrapper">
                <button className="fileButton">Open</button>
                <Form.Control
                  type="file"
                  placeholder="Choose File"
                  className="inputfile"
                  onChange={props.openFile}
                />
              </div>
              <NavDropdown.Item as={Link} to="#" onClick={props.saveFile}>
                Save
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="#" onClick={handleShow}>
              Find And Replace
            </Nav.Link>
          </Nav>
          <div className="theme-mode text-center" inline="true">
            <h6>{props.theme ? "DARK THEME" : "LIGHT THEME"}</h6>
            <label className="switch">
              <input type="checkbox" onChange={props.themeMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* Find Replace popup modal */}
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="hide-modal"
      >
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
              className="find"
              onChange={props.find}
              value={props.findValue}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Replace With</Form.Label>
            <Form.Control
              type="text"
              placeholder="Replace With"
              onChange={props.replace}
              className="replace"
              value={props.replaceValue}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Match Case"
              checked={props.ischecked}
              onChange={props.matchCase}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={props.findTextHandler}
            className="mr-2 findButton"
            disabled={props.findValue === "" ? true : false}
          >
            Find
          </Button>
          <Button
            variant="primary"
            className="replaceText mr-2"
            onClick={props.replaceHandler}
            disabled={props.replaceValue === "" ? true : false}
          >
            Replace
          </Button>
          <Button
            variant="primary"
            className="replaceButton"
            onClick={props.replaceTextHandler}
            disabled={props.replaceValue === "" ? true : false}
          >
            Replace All
          </Button>
        </Modal.Body>
      </Modal>
      {/* Find Replace popup modal */}
    </Fragment>
  );
};

export default TopNavbar;
