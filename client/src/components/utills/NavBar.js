import React from 'react';
import {Button, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {logout} from "../../http/userHttp";


const NavBarComponent = () => {

    return (
        <div className="navbar-block">

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand style={{marginLeft: 10}} href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse style={{marginRight: 10}} id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/">Admin</Nav.Link>
                        <NavDropdown title="Actions" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/create/">Create Product</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <div className="search-block">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button
                                variant="outline-success"
                            >
                                Search
                            </Button>
                        </Form>
                    </div>
                    <Nav>
                        <Nav.Link
                            href="/"
                        >
                            Home
                        </Nav.Link>

                        <Nav.Link
                            href="/cart/"
                        >
                            Cart
                        </Nav.Link>

                        <Nav.Link
                            href="/"
                            onClick={logout}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBarComponent;