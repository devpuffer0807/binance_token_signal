import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../config/AuthProvider";
import { resetPasswordAPI } from "../../api/authentication";

export default function VerifyPage() {
  const navigate = useNavigate();

  const [isLoding, setIsLoding] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state } = useLocation(); 

  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }

  const resetPassword = async () => {

    if(verifyCode === "") {
      return toast.warn("Please input your verifycation code.");
    }

    if(password === "") {
      return toast.warn("Please input your password.");
    }

    if (password !== confirmPassword) {
      return toast.error("Password shoud be equal to confirm password.");
    }

    setIsLoding(true);
    try {
      const res = await resetPasswordAPI(state.email, verifyCode, password);
      const { status } = res;
      if (status === true) {
        toast.success("Update your password successfully.");
        return setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const { message, errorCode } = res;
        if (message === "VERIFICATION_CODE_ERROR") {
          toast.error("Your verification code is not correct.");
        } else {
          toast.error(`Please contact support team. ERROR CODE: ${errorCode}`);
        }
      }
    } catch (e) {
      return toast.error("Verify Code API error.");
    }

    setIsLoding(false);
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
                Verify code
              </div>
              <div className="fs-6 text-center text-white mt-5">
                Please input your verification code.
              </div>
              <Row>
                <Form.Group
                  as={Col}
                  md="12"
                  sm="12"
                  controlId="verifyCode"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="VerifyCode"
                    className={"py-3 mt-3"}
                    value={verifyCode}
                    onChange={(e) => {
                      setVerifyCode(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="12"
                  sm="12"
                  controlId="password"
                >
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    className={"py-3 mt-3"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="12"
                  sm="12"
                  controlId="confirmPassword"
                >
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm password"
                    className={"py-3 mt-3"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="mt-4 d-flex mb-5 justify-content-center align-items-center">
                <Col lg={12} md={12} sm={12}>
                  {isLoding === true ? (
                    <Button
                      className="w-100 p-3 bg-primary-2 border border-0 d-flex align-items-center justify-content-center"
                      disabled
                    >
                      <div>Verify</div>
                      <Spinner className="ms-2" animation="grow" />
                    </Button>
                  ) : (
                    <Button
                      className="w-100 bg-white p-3 d-flex align-items-center justify-content-center text-primary-1 border border-0 fw-bold border-none primary-btn"
                      onClick={resetPassword}
                    >
                      <div>Verify</div>
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
        />
      </Row>
      <ToastContainer />
    </div>
  );
}
