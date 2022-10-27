import React, { useState, useEffect, CSSProperties } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
  Image,
  Card,
  Modal,
} from "react-bootstrap";
import DataGrid, {
  Column,
  FilterRow,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  Selection
} from 'devextreme-react/data-grid';
import { Link } from "react-router-dom";
import { useAuth } from "../../config/AuthProvider";
import axios from "axios";
import { SERVER_URL } from "../../config";
import "react-image-upload/dist/index.css";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Table from 'react-bootstrap/Table';
import { FaUserAlt, FaSignOutAlt, FaPlus, FaUserEdit } from "react-icons/fa";



export default function UsermanagePage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("create");
  const [userid, setUserid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const handleClose = () => setShow(false);
  const handleCloseAndSave = (e) => {
    e.preventDefault();
    if(firstName == "") {
      toast.warning("Please insert first name.");
      return;
    }
    if(lastName == "") {
      toast.warning("Please insert last name.");
      return;
    }
    if(userEmail == "") {
      toast.warning("Please insert Email.");
      return;
    }
    if(userRole == "") {
      toast.warning("Please insert user role.");
      return;
    }
    let payload = {
      id: userid,
      firstName: firstName,
      lastName: lastName,
      userEmail: userEmail,
      nickName: nickName,
      userRole: userRole,
    };
    if(status == "edit") {
      if(userid == "") {
        toast.error("userid error.");
        return;
      }
      axios({
        method: 'post',
        url: SERVER_URL + '/user/update',
        data: payload
      })
      .then((res) => {
        const recvData = res.data;
        if(!recvData.status) {
          toast.error(recvData.message);
          return;
        }
        toast.success("Successful update");
        loadUsersHandler();
        setShow(false);
      }).catch((e) => console.error(e));
    }
    if(status == "create") {
      axios({
        method: 'post',
        url: SERVER_URL + '/user/create',
        data: payload
      }).then((res) => {
        const recvData = res.data;
        if(!recvData.status) {
          toast.error(recvData.message);
          return;
        }
        toast.success(recvData.message);
        loadUsersHandler();
        setShow(false);
      });
    }
    if(status == "delete") {
      axios({
        method: 'get',
        url: SERVER_URL + '/user/delete/' + userid,
      })
      .then((res) => {
        const recvData = res.data;
        if(!recvData.status) {
          toast.error(recvData.message);
          return;
        }
        toast.success(recvData.message);
        loadUsersHandler();
        setShow(false);
      })
      .catch((ex) => console.error(ex));
    }
  }
  const handleShow = (userId, actionType) => {
    if(actionType != "create") {
      if(!userId) {
        toast.error('Please select correct user.');
        return;
      }
      axios({
        method: 'get',
        url: SERVER_URL + '/user/' + userId,
      })
      .then((response) => {
        const resData = response.data;
        if(!resData.status) {
          toast.error(resData.message);
        }
        setUserid(userId);
        setFirstName(resData.user.firstName);
        setLastName(resData.user.lastName);
        setNickName(resData.user.nickName);
        setUserEmail(resData.user.userEmail);
        setUserRole(resData.user.role);
        if(actionType == "edit") {
          setStatus("edit");
        }
        else {
          setStatus("delete");
        }
        setShow(true);
      }).catch((e) => console.error(e));
    }
    if (status == "create"){
      setFirstName("");
      setLastName("");
      setUserEmail("");
      setUserRole("");
      setStatus("create");
    }
    setShow(true);
  } 
  const loadUsersHandler = () => {
    axios({
      method: 'get',
      url: SERVER_URL + '/user/users',
    })
    .then((response) => {
      let tmpUsers = response.data.users;
      for( let i = 0; i < tmpUsers.length; i ++) {
        tmpUsers[i].No = i + 1;
      }
      setUsers(tmpUsers);
    }).catch((e) => console.error(e));
  }
  useEffect(() => {
    loadUsersHandler();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.role != "ADMIN") {
    return <Navigate to="/" />;
  }
  return (
    <>
    <ToastContainer />
      <Container className="pt-5, mt-5">
          <Button variant="primary" className="mx-2 px-5" onClick={() => {
            handleShow("0", "create")
          }}><FaPlus />Create</Button>
          <DataGrid
            dataSource={users}
            keyExpr={'_id'}
            allowColumnReordering={true}
            // defaultSelectedRowKeys={selectedKeys}
          >
            <GroupPanel visible={true} />
            <Grouping autoExpandAll={true} />
            <FilterRow visible={true} />
            <Selection mode={'single'}/>
            
          
            <Column
              dataField={'_id'}
              caption={'ID'}
              allowSorting={false}
              allowFiltering={false}
              allowGrouping={false}
              allowReordering={false}
              width={100}
              visible={false}
            />
            <Column dataField={'No'} caption={'No'} width={'7%'}/>  
            <Column dataField={'firstName'} caption={'First Name'} width={'13%'}/>  
            <Column dataField={'lastName'} caption={'Last Name'} width={'13%'}/>  
            <Column dataField={'nickName'} caption={'Nick Name'} width={'15%'}/>  
            <Column dataField={'userEmail'} caption={'Email'} width={'20%'}/>  
            <Column dataField={'role'}  caption={'role'} width={'10%'}/>
            <Column dataField={'_id'} caption={'Action'} cellRender={(cellData) => {
              return (
                <span>
                  <Button variant="success" className="mx-2 px-3" onClick={() => {handleShow(cellData.value, 'edit')}}><FaUserEdit />Edit</Button>
                  <Button variant="danger" className="mx-2" onClick={() => handleShow(cellData.value, 'delete')}><FaUserEdit />Delete</Button>
                </span>
              );
            }}/>

            <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
          </DataGrid>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{status} user.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCloseAndSave}>
            {status != "delete" ? (
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nick Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Nick Name" required value={nickName} onChange={(e) => setNickName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>User Role</Form.Label>
                  <Form.Control type="text" placeholder="Enter User Role" required value={userRole} onChange={(e) => setUserRole(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 justify-content-end d-flex">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" className="ms-2">
                    Save Changes
                  </Button>
                </Form.Group>
              </div>
            ) : (
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>Are you sure delete {firstName} {lastName}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 justify-content-end d-flex">
                  <Button variant="secondary" onClick={handleClose}>
                    No
                  </Button>
                  <Button variant="primary" type="submit" className="ms-2">
                    Yes
                  </Button>
                </Form.Group>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}