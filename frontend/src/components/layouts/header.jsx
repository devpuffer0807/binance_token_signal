import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button, Image, Badge, Dropdown } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useAuth } from "../../config/AuthProvider";
// import Avatar from "../../assets/images/avatar.png";
import { FaUserAlt, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { BsFillAlarmFill } from "react-icons/bs";
import Avatar from "react-avatar";

export default function Header() {
  const { user } = useAuth();
  const auth = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" className="py-3">
      <Container className="justify-content-between">
        <Navbar.Brand>
          <Link to="/" className="nav-link">
            <Image src="/assets/images/logo.svg" width="176" alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="d-flex align-items-center">
            {/* <Link to="/team" className="nav-link position-relative text-primary-1 fs-4 fw-semibold px-4 mx-2"><FaUsers/><Badge className="position-absolute top-25 border rounded-circle fs-8" bg="secondary">1</Badge></Link>
            <Link to="/group" className="nav-link text-primary-1 fs-4 fw-semibold px-4 mx-2"><FaUserAlt/></Link>
            <Link to="/" className="nav-link text-primary-1 fs-4 fw-semibold px-4 mx-2"><BsFillAlarmFill/></Link> */}
            {user == null ? (
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between ms-3 ">
                <Link
                  to="/login"
                  className="nav-link fs-5-2 fw-semibold px-4 mx-2 text-primary-1 secondary-btn"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="nav-link bg-primary-1 border rounded-2 text-white fs-5-2 fw-semibold px-4 mx-2 primary-btn"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className=" fs-5-2 fw-semibold text-primary-1 secondary-btn"
                >
                  {user.photo ? (
                    <Image
                      src={user.photo}
                      className="rounded-circle me-3"
                      width="30"
                    />
                  ) : (
                    <Avatar
                      name={user.firstName + " " + user.lastName}
                      size="30"
                      color={Avatar.getRandomColor("sitebase", [
                        "red",
                        "green",
                        "purple",
                        "orange",
                        "pink",
                      ])}
                      round={true}
                      className="me-3"
                    />
                  )}
                  {user.firstName + " " + user.lastName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      to="/profile"
                      className="nav-link text-primary-1 fs-6 fw-semibold px-4 mx-3"
                    >
                      <FaUserAlt className="me-2" />
                      Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      auth.logout();
                    }}
                  >
                    <Link
                      to="/"
                      className="nav-link text-primary-1 fs-6 fw-semibold px-4 mx-3"
                    >
                      <FaSignOutAlt className="me-2" />
                      Log out
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              // <Button className=" fs-5-2 fw-semibold px-4 text-primary-1 secondary-btn" onClick={() => {auth.logout()}}>
              // {user.photo ? (
              //   <Image src={user.photo} className="rounded-circle me-3" width="30"/>
              // ) : (
              //   <Avatar name={user.firstName +" "+ user.lastName} size="30" color={Avatar.getRandomColor('sitebase', ['red', 'green', 'purple', 'orange', 'pink'])} round={true} className="me-3"/>
              // )}
              // {user.firstName +" "+ user.lastName}
              // </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
