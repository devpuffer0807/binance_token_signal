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
import { toast } from "react-toastify";
import "react-image-upload/dist/index.css";

export default function MembershipPage() {
  return (
    <div className="MembershipPage pt-5 mt-5">
      <Container className="col-md-8 col-lg-8 col-sm-10">
        <div className="fs-1 fw-bold text-center">
          Pricing
        </div>
        <div className="fs-5-2 text-center mt-2">
          You can choose one of our subscription plans and start tracking signals.
        </div>
        <Row className="mt-5 pt-2">
          <Col md={6} sm={12}>
            <Card className="text-center"
              border='info'

            >
              <Card.Header>1 Month Subscription</Card.Header>
              <Card.Body className="p-5">
                  <Card.Title>71 USDT/Mo</Card.Title>
                  <Card.Text>
                    30 days subscription
                  </Card.Text>
                  <Button variant="info" className="mt-4 w-100 p-2">Get Start</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} sm={12}>
            <Card className="text-center"
              border='danger'
            >
              <Card.Header>3 Month Subscription</Card.Header>
              <Card.Body className="p-5">
                  <Card.Title>131 USDT/Mo</Card.Title>
                  <Card.Text>
                    90 days subscription
                  </Card.Text>
                  <Button variant="primary" className="mt-4 w-100 p-2">Get Start</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
