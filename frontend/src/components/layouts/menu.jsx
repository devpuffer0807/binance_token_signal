import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Image, Dropdown } from "react-bootstrap";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import Avatar from "react-avatar";

const symbolData = [
  {
    "symbol": "USDT", "text": "USDT Spot Signal"
  }, 
  {
    "symbol": "BUSD", "text": "BUSD Spot Signal"
  },
  {
    "symbol": "BTC", "text": "BTC Spot Signal"
  }, 
];
const futureSymbol = [
  {
    "symbol": "Future", "text": "Binance Futures"
  }, 
];


export default function Menu(props) {
  const [cursymbol, setCursymbol] = useState(0);
  
  const handleCurSymbolChange = (key) => {
    if(key == cursymbol && props.futurestate == false){
      return;
    }
    
    setCursymbol(key);
    
    props.setLoading(true);
    props.setFuturestate(false);
  }  
  const handleFutureSymbolChange = (key) => {
    if(props.futurestate == true){
      return;
    }
    props.setFuturestate(true);
    props.setLoading(true);
  }  
  return (
    <Navbar collapseOnSelect expand="lg" className="py-3">
      <Container className="justify-content-between">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-start"
        >
          <Nav className="d-flex align-items-center">
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
