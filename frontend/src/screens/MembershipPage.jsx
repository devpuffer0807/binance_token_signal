import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
  Image,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../config/AuthProvider";
import axios from "axios";
import { SERVER_URL } from "../config";
import "react-image-upload/dist/index.css";
import { Navigate } from "react-router-dom";

const MEMBERSHIP_PLAN = 
  {
    BASIC:{
      TITLE: "1 Month Subscription",
      CONTENT: "Buy 30 Days Subscription Steps 30 Days Subscription Fee: 71.00 USDT",
      STYLE: "info",
      PRICE: 71 
    },
    PLUS:{
      TITLE: "3 Month Subscription",
      CONTENT: "Buy 90 Days Subscription Steps 90 Days Subscription Fee: 176.00 USDT",
      STYLE: "danger",
      PRICE: 176
    },
  };
const MembershipPlanPage = (props) => {
  return (
    <div className="MembershipPlanPage pt-5 mt-5">
      <Container className="col-md-8 col-lg-8 col-sm-10">
        <div className="fs-1 fw-bold text-center">
          Pricing
        </div>
        <div className="fs-5-2 text-center mt-2">
          You can choose one of our subscription plans and start tracking signals.
        </div>
        <Row className="mt-5 pt-2">
          {
            Object.keys(MEMBERSHIP_PLAN).map((key) => {
              return (
                <Col md={6} sm={12}>
                  <Card className="text-center"
                    border= { MEMBERSHIP_PLAN[key].STYLE }
                  >
                    <Card.Header> { MEMBERSHIP_PLAN[key].TITLE } </Card.Header>
                    <Card.Body className="p-5">
                        <Card.Title>{MEMBERSHIP_PLAN[key].PRICE} USDT/Mo</Card.Title>
                        <Card.Text>
                          { MEMBERSHIP_PLAN[key].TITLE }
                        </Card.Text>
                        <Button variant= { MEMBERSHIP_PLAN[key].STYLE } className="mt-4 w-100 p-2"
                          onClick={() => {
                            props.setCurplan(key);
                            props.setPage(1);
                          }}
                        >
                          Get Start
                        </Button>
                    </Card.Body>
                  </Card>
                </Col>   
              );
            })
          }
        </Row>
      </Container>
    </div>
  );
}
const SelectUSDTPage = (props) => {
  return (
    <div className="SelectUSDTPage by-5">
        <div>
          <div className="">Send USDT to Whaler Hunter App Wallet</div>
          <div className="text-danger fs-5 fw-semibold">SELECT USDT</div>
          <Image src="https://whalehuntapp.com/assets/whitdraw.png"/>
        </div>
      <Button onClick={() => {props.setPage(2)}}>Next</Button>
    </div>
  );
}
const CopyWalletAddress = (props) => {
  return (
    <div className="CopyWalletAddress">
      3rd page
      <Button onClick={() => {props.setPage(3)}}>nesldkfj</Button>
    </div>
  )
}
const InputTransferCode = (props) => {
  return (
    <div className="InputTransferCode">
      4th page
      <Button onClick={() => {props.setPage(3)}}>next</Button>
    </div>
  )
}
export default function MembershipPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [curplan, setCurplan] = useState("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {
        page != 0 && (
          <div className="membership-title container py-5">
            <Card>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-3">
                    { MEMBERSHIP_PLAN[curplan].CONTENT }
                  </Card.Title>
                  <Card.Text className="mb-5">
                    If your request is correct, it will be approved within 12 hours. To learn the TxId code, you can follow the instruction athttps://www.binance.com/en/support/faq/2c325e53daf04442adbaf8f6ba052f71. Incorrect requests will be denied.
                  </Card.Text>
                    {
                      page == 0 ? (
                        <MembershipPlanPage setPage={setPage} setCurplan={setCurplan}/>
                      ) : page == 1 ? <SelectUSDTPage setPage={setPage} planKey={curplan}/> : page == 2 ? <CopyWalletAddress setPage={setPage} />
                      : <InputTransferCode setPage={setPage} />
                    }
                </Card.Body>
              </Card>
            </Card>
          </div>
        )
      }
      
      
    </>
  );
}
