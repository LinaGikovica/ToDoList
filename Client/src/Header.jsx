import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Task List</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to='/tasks'>
            <NavItem>Tasks</NavItem>
          </LinkContainer>
          <LinkContainer to='/users'>
            <NavItem>Users</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

export default Header;
