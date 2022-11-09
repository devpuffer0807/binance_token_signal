import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { GoMail } from "react-icons/go";
import { useAuth } from "../../config/AuthProvider";

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmailVal, setUserEmailVal] = useState(true);
  const [userPasswordVal, setUserPasswordVal] = useState(true);

  const [isLoding, setIsLoding] = useState(false);
  const auth = useAuth();

  const Login = () => {

    setIsLoding(true);
    if (userEmail === "") {
      setUserEmailVal(false);
    }
    if (userPassword === "") {
      setUserPasswordVal(false);
    }

    if (userEmail === "" || userPassword === "") {
      setIsLoding(false);
      toast.error("Please input all informations.");
      return;
    }

    const data = {
      userEmail: userEmail,
      userPassword: userPassword,
    };

    axios
      .post(SERVER_URL + "/auth/login", data)
      .then((res) => {
        if (res.data.status === true) {
          setIsLoding(false);
          res.data.data.token = res.data.token;
          auth.login(res.data.data);
          toast.success(res.data.message);
        } else {
          setIsLoding(false);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setIsLoding(false);
        toast.error("Please check your login information!");
      });
  };

  return (
    <div className="HomePage overflow-hidden">
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
                Log in
              </div>
              <div className="fs-5-2 text-center text-white mt-2">
                No account yet?
                <Link
                  to="/register"
                  className="nav-link d-inline-block fw-bold px-2"
                >
                  Create an account
                </Link>
              </div>
              <Row>
                <Form.Group
                  as={Col}
                  md="6"
                  sm="12"
                  controlId="validationCustom0"
                >
                  {userEmailVal === false ? (
                    <Form.Control
                      required
                      type="email"
                      placeholder="Input your Email"
                      className="py-3 mt-3 invalid"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                    />
                  ) : (
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email"
                      className="py-3 mt-3"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                    />
                  )}
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  sm="12"
                  controlId="validationCustom1"
                >
                  {userPasswordVal === false ? (
                    <Form.Control
                      required
                      type="password"
                      placeholder="Input your Password"
                      className="py-3 mt-3 invalid"
                      value={userPassword}
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                      }}
                    />
                  ) : (
                    <Form.Control
                      required
                      type="password"
                      placeholder="Passowrd"
                      className="py-3 mt-3"
                      value={userPassword}
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                      }}
                    />
                  )}
                </Form.Group>
              </Row>
              <Row className="mt-4 d-flex mb-5 justify-content-center align-items-center">
                <Col lg={12} md={12} sm={12}>
                  {isLoding === true ? (
                    <Button
                      className="w-100 p-3 bg-primary-2 border border-0 d-flex align-items-center justify-content-center"
                      disabled
                    >
                      <div>Login with Email</div>
                      <Spinner className="ms-2" animation="grow" />
                    </Button>
                  ) : (
                    <Button
                      className="w-100 bg-white p-3 d-flex align-items-center justify-content-center text-primary-1 border border-0 fw-bold border-none primary-btn"
                      onClick={Login}
                    >
                      <div>Login with Email</div>
                      <GoMail className="fs-4 ms-2" />
                    </Button>
                  )}
                </Col>
              </Row>
              {/* <div className="fs-6 text-center text-white mb-4">
                or Login with
              </div> */}
              {/* <Row className="justify-content-center mb-5">
                <Button className="bg-white border border-0 mx-3 col-2 d-flex align-items-center justify-content-center p-2 secondary-btn">
                  <Image src="/assets/images/go.svg" width="50" />
                </Button>
                <Button className="bg-white border border-0 mx-3 col-2 d-flex align-items-center justify-content-center p-2 secondary-btn">
                  <Image src="/assets/images/fc.svg" width="50" />
                </Button>
              </Row> */}
              <div className="fs-6 text-center text-white mt-5">
                By signing in or creating an account, you agree with your{" "}
                <div className="d-flex align-items-center justify-content-center">
                  <Link to="/forgot" className="nav-link text-white fw-bold px-2">
                    Forgot Password
                  </Link>
                  {/* <Link to="/" className="nav-link text-white fw-bold px-2">
                    Privacy Statement
                  </Link> */}
                </div>
              </div>
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
      <ToastContainer />
    </div>
  );
}
