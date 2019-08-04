import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";

const NavBarComponent = (props) => {
  return (
    <header>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">LEDanager</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button color="success" onClick={() => props.sendUpdatedState()}>Save</Button>
            </NavItem>
          </Nav>
        </Navbar>
      </header>
  )
}

export default NavBarComponent;