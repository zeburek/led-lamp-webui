import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";

const NavBarComponent = (props) => {
  return (
    <header>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">LEDanager</NavbarBrand>
          <Nav navbar>
              <NavItem>
                <Button onClick={() => props.toggleModal()}>Update</Button>
              </NavItem>
            </Nav>
        </Navbar>
      </header>
  )
}

export default NavBarComponent;
