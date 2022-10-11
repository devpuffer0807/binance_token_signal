import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Image, Dropdown } from "react-bootstrap";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import Avatar from "react-avatar";

const symbolData = [{"symbol": "USDT", "text": "USDT Spot Signal"}, {"symbol": "BUSD", "text": "BUSD Spot Signal"}];


export default function Menu(props) {
  const [cursymbol, setCursymbol] = useState(0);
  const handleCurSymbolChange = (key) => {
    if(key == cursymbol){
      return;
    }
    setCursymbol(key);
    props.socket.emit("changeSymbol", symbolData[key].symbol);
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
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                className=" fs-5-2 fw-semibold text-primary-1 secondary-btn"
              >
                {symbolData[cursymbol].text}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {
                  symbolData.map((symbol, key) => {
                    return(
                      <Dropdown.Item
                        onClick={() => {
                          handleCurSymbolChange(key);
                        }}
                      >
                        {symbol.text}
                      </Dropdown.Item>
                    )
                  })
                }
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
