import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { GoMail } from "react-icons/go";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../config/AuthProvider";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [firstNameVal, setFirstNameVal] = useState(true);
  const [lastNameVal, setLastNameVal] = useState(true);
  const [userEmailVal, setUserEmailVal] = useState(true);
  const [userPasswordVal, setUserPasswordVal] = useState(true);
  const [isLoding, setIsLoding] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();
  

  const Register = () => {
    setIsLoding(true);

    if (firstName === "") {
      setFirstNameVal(false);
    }
    if (lastName === "") {
      setLastNameVal(false);
    }
    if (userEmail === "") {
      setUserEmailVal(false);
    }
    if (userPassword === "") {
      setUserPasswordVal(false);
    }

    if (
      firstName === "" ||
      lastName === "" ||
      userEmail === "" ||
      userPassword === ""
    ) {
      setIsLoding(false);
      toast.error("Please input all informations.");
      return;
    } else {
      setTimeout(() => {
        setIsLoding(false);
      }, 2000);
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      userEmail: userEmail,
      userPassword: userPassword,
      role: role,
    };

    console.log(data);

    axios
      .post(SERVER_URL + "/auth/register", data)
      .then((res) => {
        if (res.data.status === true) {
          setTimeout(() => {
            setIsLoding(false);
            toast.success(res.data.message);
          }, 2000);
          navigate("/login");
        } else {
          toast.error(res.data.message);
          setTimeout(() => {
            setIsLoding(false);
            toast.error(res.data.message);
          }, 2000);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setIsLoding(false);
          toast.error("!");
        }, 2000);
      });
  };

  return (
    <div className="RegisterPage">
      <Row>
        <Col
          lg={6}
          md={6}
          sm={12}
          style={{
            backgroundImage: `url("/assets/images/bg.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="main-form-content py-5 d-flex align-items-center justify-content-center"
        >
          <Container className="col-md-8 col-lg-8 col-sm-10">
            <Form>
              <div className="fs-1 fw-bold text-center text-white">
                Create an account
              </div>
              <div className="fs-5-2 text-center text-white mt-2">
                Already an account?{" "}
                <Link
                  to="/login"
                  className="nav-link d-inline-block fw-bold px-2"
                >
                  Log in
                </Link>
              </div>
              <Row>
                <Form.Group
                  as={Col}
                  md="6"
                  sm="12"
                  controlId="validationCustom0"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    className={firstNameVal ? "py-3 mt-3" : "py-3 mt-3 invalid"}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  sm="12"
                  controlId="validationCustom1"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    className={lastNameVal ? "py-3 mt-3" : "py-3 mt-3 invalid"}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mt-4">
                <Form.Group as={Col} md="12" controlId="validationCustom2">
                  {userEmailVal === false ? (
                    <Form.Control
                      required
                      type="email"
                      placeholder="Input your Email"
                      value={userEmail}
                      className="py-3 invalid"
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                    />
                  ) : (
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email"
                      value={userEmail}
                      className="py-3"
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                    />
                  )}
                </Form.Group>
              </Row>
              <Row className="mt-4">
                <Form.Group controlId="validationCustom3">
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    className={userPasswordVal ? "py-3" : "py-3 invalid"}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mt-4 mx-auto  w-100">
                <Form.Select
                  className="py-3"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="USER">User</option>
                  {/* <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option> */}
                </Form.Select>
              </Row>
              <Row className="mt-4 d-flex mb-5 justify-content-center align-items-center">
                <Col lg={12} md={12} sm={12}>
                  {isLoding === true ? (
                    <Button
                      className="w-100 p-3 bg-primary-2 border border-0 d-flex align-items-center justify-content-center"
                      disabled
                    >
                      <div>Create Your Account</div>
                      <Spinner className="ms-2" animation="grow" />
                    </Button>
                  ) : (
                    <Button
                      className="w-100 bg-white p-3 d-flex align-items-center justify-content-center text-primary-1 border border-0 fw-bold border-none primary-btn"
                      onClick={Register}
                    >
                      <div>Create Your Account</div>
                      <GoMail className="fs-4 ms-2" />
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </Container>
        </Col>
        <Col
          lg={6}
          md={6}
          className="d-md-flex align-items-center justify-content-center media-section-right"
          style={{
            backgroundImage: `url("/assets/images/bg1.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <Image src="/assets/images/logo.svg" /> */}
        </Col>
      </Row>
    </div>
  );
}
