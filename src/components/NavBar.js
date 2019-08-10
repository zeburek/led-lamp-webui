import React from 'react';
import { Navbar, NavbarBrand } from "reactstrap";

const NavBarComponent = () => {
  return (
    <header>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">LEDanager</NavbarBrand>
        </Navbar>
      </header>
  )
}

export default NavBarComponent;
