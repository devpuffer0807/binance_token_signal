import React, {useState, useEffect} from "react";
import { Container, Row, Button, Col, Card, Modal, Form } from "react-bootstrap";
import { useAuth } from "../config/AuthProvider";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import Avatar from 'react-avatar';

export default function HomePage() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [title, setTitle] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [teams, setTeams] = useState([]);
  const [edit, setEdit] = useState(false);
  const [teamId, setTeamId] = useState("");

 useEffect(() => {
  axios
  .get(SERVER_URL + "/users")
  .then((res) => {
    if (res.data.status === true) {
      const _data = res.data.users;
      const data = [];
      for(let i = 0; i < _data.length; i ++) {
        const values = {label: _data[i].firstName + " " +_data[i].lastName, value: _data[i]._id};
        data.push(values);
        console.log('value-', values)
      }
      console.log("data", data)

      setUsers(data)
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

  axios
  .get(SERVER_URL + "/teams")
  .then((res) => {
    if (res.data.status === true) {
      console.log( "teams",res.data.data)
      setTeams(res.data.data);
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
 }, [])

  if(!user) {
    return <Navigate to="/login"/>;
  }
  const saveData = () => {
    setIsLoding(true);
    const data = {
      name: title,
      members : selected
    }
    
    if(edit == false) {
      axios
      .post(SERVER_URL + "/team", data)
      .then((res) => {
        if (res.data.status === true) {
          
        } else {
          toast.error(res.data.message);
          setTimeout(() => {
            setIsLoding(false);
            setShow(false);
            setTitle("");
            setSelected([]);
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
    }
    else {
      const data = {
        teamId: teamId,
        name: title,
        members : selected
      }
      axios
      .post(SERVER_URL + "/team", data)
      .then((res) => {
        if (res.data.status === true) {
          
        } else {
          toast.error(res.data.message);
          setTimeout(() => {
            setIsLoding(false);
            setShow(false);
            setTitle("");
            setSelected([]);
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
    }

   
  }

  const editData = (id) => {
    setTitle(teams[id].name);
    setSelected(teams[id].members);
    setTeamId(teams[id]._id);
    setEdit(true);
    setShow(true);
  }

  return (
    <div className="HomePage">      
      <Container>
        <Row className="py-4">
          {teams.map((item, key) => (
          <Col lg={3} md={3} sm={12} className="mt-3">
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Created Date : {item.createdAt}</Card.Subtitle>
                <Card.Text>Team Members : ({item.members.length})</Card.Text>
                <div className="members">
                  {item.members.map((member, key) => (
                    <Avatar name={member.label} size="30" color={Avatar.getRandomColor('sitebase', ['red', 'green', 'purple', 'orange', 'pink'])} round={true} className="mb-1"/>
                  ))}
                </div>
                { user.role == "ADMIN" ? (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Button className="col-md-8 col-sm-6 primary-btn bg-primary-1 text-white border">Open</Button>
                  <Button className="primary-btn bg-primary-1 text-white border"  onClick={() => editData(key)}><FaEdit/></Button>
                  <Button className="primary-btn bg-primary-1 text-white border"><FaTrashAlt/></Button>
                </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center mt-3">
                  <Button className="col-md-12 col-sm-12 primary-btn bg-primary-1 text-white border">Open</Button>
                </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          ))}
        </Row>
      </Container>
      <Modal show={show} onHide={!show}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className="mt-4">
              <Form.Group as={Col} md="12" controlId="validationCustom0">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Please input Title"
                      value={teamId}
                      className="py-3"
                    />
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Please input Title"
                      value={title}
                      className="py-3"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                </Form.Group>
              </Row>
              <Row>
                <MultiSelect
                  options={users}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                  className="py-2"
                />
              </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="primary-btn bg-white text-primary-1 border-1 border-color-primary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button  className="primary-btn bg-primary-1 text-white border" onClick={saveData}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
