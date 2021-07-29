import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import userContext from "../context/userContext";
import { deleteToken } from "../http/auth";

export default function NavbarComponent() {
  const { user, setUser } = useContext(userContext);
  useEffect(() => console.log("user", user));
  const handleLogout = () => {
    setUser(null);
    deleteToken();
  };
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="d-flex flex-row align-items-center">
            <Nav.Link className="">
              <NavLink to="/">Home</NavLink>
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link>
                  <NavLink to="/cart">Cart</NavLink>
                </Nav.Link>
                <Nav.Link
                  className="justify-self-end"
                  style={{ float: "right", justifySelf: "end" }}
                >
                  <Link className="btn btn-danger " onClick={handleLogout}>
                    logout
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link>
                  <NavLink to="/login">login</NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink to="/register">register</NavLink>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
