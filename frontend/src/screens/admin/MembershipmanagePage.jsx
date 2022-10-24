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
import { SERVER_URL } from "../../config";

export default function MembershipmanagePage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [memberships, setMemberships] = useState([]);

  const loadSubscriptionHandle = () => {
    axios({
      method: 'get',
      url: SERVER_URL + '/membership'
    })
    .then((response) => {
      const recvData = response.data;
      if(!recvData.status) {
        toast.error(recvData.message);
        return;
      }
      else {
        
      }
    })
    .catch((ex) => {console.error(ex)})
  }
  const loadMembershipsHandle = () => {

  }
  useEffect(() => {
    loadSubscriptionHandle();
  }, []);
  const tabSelectHandle = (e) => {
    if(e == 'subscription') {
      loadSubscriptionHandle();
    }
    else {
      loadMembershipsHandle();
    }
  }
  return (
    <div className="MembershipmanagePage mt-5 ">
      <ToastContainer/>
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="subscription" onSelect={tabSelectHandle}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="subscription">
                    Membership Subscription
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="management">User Membership</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="subscription">
                  
                </Tab.Pane>
                <Tab.Pane eventKey="management">
                  second
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  )
}