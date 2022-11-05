import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../config/AuthProvider";
import { forgotPasswordAPI } from "../../api/authentication";

export default function ForgotPage() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userEmailVal, setUserEmailVal] = useState(true);

  const [isLoding, setIsLoding] = useState(false);

  const { user } = useAuth();

  const forgotPassword = async () => {
    if (userEmail === "") {
      return setUserEmailVal(false);
    }

    if (userEmail === "") {
      return toast.error("Please input email address.");
    }

    setIsLoding(true);
    try {
      const res = await forgotPasswordAPI(userEmail);
      const { status } = res;
      if (status === true) {
        toast.success("Please check your email and confirm verification code.");
        return navigate("/verify", { state: { email: userEmail } });
      } else {
        const { message, errorCode } = res;
        if (message === "UNREGISTER_EMAIL") {
          toast.error("Your email address is not registered.");
        } else {
          toast.error(`Please contact support team. ERROR CODE: ${errorCode}`);
        }
      }
    } catch (e) {
      return toast.error("Forgot password API error.");
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
                Forgot Password
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
              <div className="fs-6 text-center text-white mt-5">
                Enter your user account's verified email address and we will
                send you a verification code.
              </div>
              <Row>
                <Form.Group
                  as={Col}
                  md="12"
                  sm="12"
                  controlId="validationCustom0"
                >
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    className={userEmailVal ? "py-3 mt-3" : "py-3 mt-3 invalid"}
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
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
                      <div>Next</div>
                      <Spinner className="ms-2" animation="grow" />
                    </Button>
                  ) : (
                    <Button
                      className="w-100 bg-white p-3 d-flex align-items-center justify-content-center text-primary-1 border border-0 fw-bold border-none primary-btn"
                      onClick={forgotPassword}
                    >
                      <div>Next</div>
                      <FaArrowRight className="fs-4 ms-2" />
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
