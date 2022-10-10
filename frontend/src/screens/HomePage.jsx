import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../config/AuthProvider";
import { Navigate } from "react-router-dom";
import { testFunc } from "../api/authentication/signal";

export default function HomePage() {
  const { user } = useAuth();

  useEffect(() => {
    testFunc().then((res) => {
      
    })
  }, [])

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="HomePage">
      <Container>
        <Row className="py-4"></Row>
      </Container>
    </div>
  );
}
