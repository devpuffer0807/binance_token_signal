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

export default function MembershipPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNicktName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [firstNameVal, ] = useState(true);
  const [lastNameVal, ] = useState(true);
  const [nickNameVal, ] = useState("");
  const [userEmailVal, ] = useState(true);
  const [userPasswordVal, ] = useState(true);
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
    <div className="MembershipPage">
      <Container className="col-md-8 col-lg-8 col-sm-10">
        MembershipPage
      </Container>
    </div>
  );
}
