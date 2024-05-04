import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const { token, setToken } = useAuth();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(token ? jwtDecode(token)?.username : "Anonymous");
  }, [token]);

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Management
        </Navbar.Brand>
        {!token && (
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to={"/register"}>
                Register
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={"/login"}>
                Login
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
        <Navbar.Toggle />
        {token && (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <strong>{username}</strong>
            </Navbar.Text>
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={logout} className="underline">
                  <ins>Logout</ins>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}
