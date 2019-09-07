import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";

const NavBarComponent = (props) => {
  return (
    <header>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">LEDanager</NavbarBrand>
          <Nav className="d-flex align-items-center" navbar>
            <NavItem>
              <Button onClick={() => props.toggleModal()}>Update</Button>
            </NavItem>
            <NavItem className="px-2 d-flex align-items-center" onClick={() => props.reconnect()}>
              Connection <div className={ "ml-2 led " + (props.connection ? "led-green":"led-red") }></div>
            </NavItem>
          </Nav>
        </Navbar>
      </header>
  )
}

export default NavBarComponent;
