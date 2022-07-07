import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {logout} from "../http/userHttp";


const NavBarComponent = () => {

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/admin/">Admin</Nav.Link>
                            <NavDropdown title="Actions" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/create/">Create Product</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link
                                href="/products/"
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
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBarComponent;