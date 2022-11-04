import React, { useEffect, useState } from "react";
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
  Tab,
  Nav,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import DataGrid, {
  Column,
  FilterRow,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  Selection
} from 'devextreme-react/data-grid';
import axios from "axios";
import { SERVER_URL, MEMBERSHIP_PLAN } from "../../config";
import { FaUserEdit } from "react-icons/fa";
import { useAuth } from "../../config/AuthProvider";
import { Navigate } from "react-router-dom";

export default function MembershipmanagePage() {
  const {user} = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [currentPlan, setCurrentPlan] = useState("TRYAL");
  const [period, setPeriod] = useState(1);
  const [editmode, setEditmode] = useState(false);
  useEffect(() => {
    loadProposalHandle();
  }, []);
  if (user.role != "ADMIN") {
    return <Navigate to="/" />;
  }
  const handleClose = () => {
    setShow(false);
  }
  const loadProposalHandle = () => {
    let header = {
      'x-auth-token': user.token,
    }
    axios({
      method: 'get',
      url: SERVER_URL + '/membership/proposals',
      headers: header
    })
    .then((response) => {
      const recvData = response.data;
      console.log(recvData);
      if(!recvData.status) {
        toast.error(recvData.message);
        return;
      }
      else {
        let tmpProposals = recvData.proposals;
        for(let i = 0; i < tmpProposals.length; i++){
          tmpProposals[i].No = i + 1;
        }
        setSubscriptions(tmpProposals)
      }
    })
    .catch((e) => {
      toast.warning(e.response.data.message);
      if(e.response.status == 401) {
        window.location.replace('/login');
      }
    })
  }
  const loadMembershipsHandle = () => {
    let header = {
      'x-auth-token': user.token,
    }
    axios({
      method: 'get',
      url: SERVER_URL + '/user/users',
      headers: header
    })
    .then((response) => {
      let tmpUsers = response.data.users;
      for( let i = 0; i < tmpUsers.length; i ++) {
        tmpUsers[i].No = i + 1;
      }
      setUsers(tmpUsers);
    }).catch((e) => {
      toast.warning(e.response.data.message);
      if(e.response.status == 401) {
        window.location.replace('/login');
      }
    });
  }
  const tabSelectHandle = (e) => {
    if(e == 'subscription') {
      loadProposalHandle();
    }
    else {
      loadMembershipsHandle();
    }
  }
  const handleCloseAndSave = (e) => {
    e.preventDefault();
    if(period == 0) {
      toast.error("Please insert period.");
      return;
    }
    let payload = {
      id: id,
      plan: currentPlan,
      period: period,
      mode: editmode,
    };
    let header = {
      'x-auth-token': user.token,
    }
    axios({
      method: 'post',
      url: SERVER_URL + '/membership/updateuserplan',
      data: payload,
      headers: header
    })
    .then((res) => {
      const recvData = res.data;
      if(!recvData.status) {
        toast.error(recvData.message);
        return;
      }
      toast.success(recvData.message);
      if(editmode == true) {
        loadProposalHandle();
      }
      else {
        loadMembershipsHandle();
      }
      setShow(false);
    }).catch((e) => {
      toast.warning(e.response.data.message);
      if(e.response.status == 401) {
        window.location.replace('/login');
      }
    });
  }
  const handleShow = (userId, mode) => {
    setId(userId);
    for(let i = 0; i < subscriptions.length; i ++) {
      if(subscriptions[i]._id == userId) {
        setFirstName(subscriptions[i].firstName);
        setLastName(subscriptions[i].lastName);
        setCurrentPlan(subscriptions[i].plan);
        break;
      }
    }
    if(mode == "edit") {
      setEditmode(true);
    }
    else {
      setEditmode(false);
      setCurrentPlan("TRYAL");
    }
    setShow(true);
  }
  return (
    <div className="MembershipmanagePage mt-5 ">
      <ToastContainer/>
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="subscription" onSelect={tabSelectHandle}>
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="subscription">
                    Subscriptions
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="management">User Membership</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="subscription">
                  <DataGrid 
                    dataSource={subscriptions}
                    allowColumnReordering={true}
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
                    <Column dataField={'firstName'} caption={'First Name'} width={'10%'}/>  
                    <Column dataField={'lastName'} caption={'Last Name'} width={'10%'}/>  
                    <Column dataField={'userEmail'} caption={'Email'} width={'25%'}/>
                    <Column dataField={'plan'} caption={'Plan'} width={'10%'}/>
                    <Column dataField={'transferCode'} caption={'Transfer Code'} width={'20%'}/>
                    <Column dataField={'_id'} caption={'Action'} cellRender={(cellData) => {
                      return (
                        <span>
                          <Button variant="success" className="mx-2 px-3" onClick={() => {handleShow(cellData.value, 'edit')}}><FaUserEdit />Edit</Button>
                        </span>
                      );
                    }}/>
                    <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
                    <Paging defaultPageSize={10} />
                  </DataGrid>
                </Tab.Pane>
                <Tab.Pane eventKey="management">
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
                    <Column dataField={'firstName'} caption={'First Name'} width={'10%'}/>  
                    <Column dataField={'lastName'} caption={'Last Name'} width={'10%'}/>  
                    <Column dataField={'userEmail'} caption={'Email'} width={'25%'}/>  
                    <Column dataField={'membershipPlan'}  caption={'Plan'} width={'10%'}/>
                    <Column dataField={'expireDate'} dataType={"datetime"}  caption={'Expire'} cellRender={(cellData) => {
                      return cellData.value.toISOString().split('T')[0]
                    }}/>
                    <Column dataField={'_id'} caption={'Action'} width={'15%'} cellRender={(cellData) => {
                      return (
                        <span>
                          <Button variant="success" className="mx-2 px-3" onClick={() => {handleShow(cellData.value, 'create')}}><FaUserEdit />Update</Button>
                        </span>
                      );
                    }}/>
                    
                    <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
                    <Paging defaultPageSize={10} />
                  </DataGrid>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {firstName} {lastName} Membership</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCloseAndSave}>
            <Form.Group className="my-3">
              <Form.Label>Membership Plan</Form.Label>
              {
                !editmode ? (
                  <Form.Select aria-label="Default select example" onChange={(e) => setCurrentPlan(e.target.value)}>
                  {
                    Object.keys(MEMBERSHIP_PLAN).map((key) => {
                      return(
                        <option value={ key }>{ key }</option>
                      )
                    })
                  }
                </Form.Select>
                ) : (
                  <Form.Control type="text" placeholder="Enter Last Name" required value={currentPlan} readOnly/>
                )
              }              
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Period ({MEMBERSHIP_PLAN[currentPlan].PERIOD_UNIT}) </Form.Label>
              <Form.Control type="number" placeholder="Enter Period" value={period} onChange={(e) => setPeriod(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3 justify-content-end d-flex">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" className="ms-2">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}