import React, {useContext, useState} from 'react';
import {Button, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {logout} from "../../http/userHttp";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";


const NavBarComponent = observer(() => {

    const {user, product} = useContext(Context)
    const navigate = useNavigate()

    const [search, setSearch] = useState('')

    const setSearchHandler = async () => {
        await navigate('/')
        await product.setSearchInput(search)
    }

    return (
        <div className="navbar-block">

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand style={{marginLeft: 10}} href="/">My Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse style={{marginRight: 10}} id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {user.user.role === 'admin' && <Nav.Link href="/admin/">Admin</Nav.Link>}
                        <NavDropdown title="Actions" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/create/">Create Product</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <div className="search-block">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <Button
                                variant="outline-success"
                                onClick={setSearchHandler}
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
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Nav.Link>

                        {user.isAuth ?
                            <Nav.Link
                                href={"/login"}
                                onClick={logout}
                            >
                                Logout
                            </Nav.Link>
                            :
                            <Nav.Link
                                href={"/login"}
                            >
                                Login
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
});

export default NavBarComponent;