
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions.js";
import SearchBox from "./SearchBox.js";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
const NavBar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Link to="/" className="link">
            <Navbar.Brand>ADDISHOP</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
              <SearchBox />
            </Nav>
            <Nav>
              <Nav.Link className="add-product">
                <Link to="/create/product" className="link text-light">
                  <i class="fas fa-plus"></i> ADD PRODUCT
                </Link>
              </Nav.Link>
              {userInfo ? (
                
                    <a
                      className="dropdown-item text-light"
                      href="#"
                      data-toggle="modal"
                      data-target="#logoutModal"
                      onClick={logoutHandler}
                    >
                      <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </a>      
                
              ) : (
                <>
                  <Nav.Link>
                    <Link to="/login" className="link text-light">
                      <li class="fas fa-user"></li> SING IN
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                  <Link to="/login" className="link text-light">
                    <li class="fas fa-user"></li> REGISTER
                  </Link>
                </Nav.Link>
              </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};


export default NavBar;