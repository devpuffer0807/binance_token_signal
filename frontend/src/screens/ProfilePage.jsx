import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../config/AuthProvider";
import axios from "axios";
import { SERVER_URL } from "../config";
import { toast } from "react-toastify";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNicktName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [firstNameVal, setFirstNameVal] = useState(true);
  const [lastNameVal, setLastNameVal] = useState(true);
  const [nickNameVal, setNicktNameVal] = useState("");
  const [userEmailVal, setUserEmailVal] = useState(true);
  const [userPasswordVal, setUserPasswordVal] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setNicktName(user.nickName);
    setUserEmail(user.userEmail);
    setUserPhoto(user.photo);
  }, []);

  const getImageFileObject = (imageFile) => {
    console.log(imageFile.file);
    const formData = new FormData();
    formData.append("file", imageFile.file);

    axios
      .post(SERVER_URL + "/upload", formData)
      .then((res) => {
        setUserPhoto(res.data.data);
      })
      .catch((err) => {});
  };

  const runAfterImageDelete = (file) => {
    console.log({ file });
  };

  const saveProfile = () => {
    setIsLoding(true);
    const data = {
      firstName: firstName,
      lastName: lastName,
      nickName: nickName,
      userEmail: userEmail,
      userPassword: userPassword,
      photo: userPhoto,
    };

    axios
      .post(SERVER_URL + "/profile/update", data)
      .then((res) => {
        if (res.data.status === true) {
          setTimeout(() => {
            setIsLoding(false);
            toast.success(res.data.message);
          }, 1000);
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
          toast.error("Please check your login information!");
        }, 2000);
      });
  };

  return (
    <div className="ProfilePage">
      <Container className="col-md-8 col-lg-8 col-sm-10">
        <Form>
          <div className="fs-1 fw-bold text-center text-white">
            Create an account
          </div>
          <div className="fs-5-2 text-center text-white mt-2">
            Already an account?{" "}
            <Link to="/login" className="nav-link d-inline-block fw-bold px-2">
              Log in
            </Link>
          </div>
          <Row className="justify-content-center">
            {user.photo ? (
              <Col lg={2} md={2} sm={4}>
                <Image
                  src={user.photo}
                  width="100"
                  className="border rounded-circle"
                />
              </Col>
            ) : (
              <ImageUploader
                onFileAdded={(img) => getImageFileObject(img)}
                onFileRemoved={(img) => runAfterImageDelete(img)}
              />
            )}
          </Row>
          <Row>
            <Form.Group as={Col} md="4" sm="12" controlId="validationCustom0">
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
            <Form.Group as={Col} md="4" sm="12" controlId="validationCustom1">
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
            <Form.Group as={Col} md="4" sm="12" controlId="validationCustom2">
              <Form.Control
                required
                type="text"
                placeholder="Nick Name"
                className={nickNameVal ? "py-3 mt-3" : "py-3 mt-3 invalid"}
                value={nickName}
                onChange={(e) => {
                  setNicktName(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mt-4">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={userEmail}
                className={userEmailVal ? "py-3" : "py-3 invalid"}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mt-4">
            <Form.Group controlId="validationCustom01">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  className= { userPasswordVal ? "py-3" : "py3 invalid" } 
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
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
                  <Spinner className="ms-2" animation="grow" />
                </Button>
              ) : (
                <Button
                  className="w-100 bg-primary-1 text-white p-3 d-flex align-items-center justify-content-center text-primary-1 border border-0 fw-bold  primary-btn"
                  onClick={saveProfile}
                >
                  <div>Save Profile</div>
                </Button>
              )}
            </Col>
          </Row>
          <div className="fs-6 text-center text-white mb-4">
            or sign up with
          </div>
        </Form>
      </Container>
    </div>
  );
}
