import { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api";
import { useAuth } from "../context/AuthProvider";
import { useToast } from "../context/ToastProvider";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();
  const { setParams } = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("users/login", { email, password })
      .then((res) => {
        const { data } = res;
        setToken(data?.token);
        setParams({
          show: true,
          message: data?.message,
          variant: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        const { response } = err;
        setParams({
          show: true,
          message: response?.data,
          variant: "danger",
        });
        console.log(err);
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="d-flex justify-content-between">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Login
        </Button>
        <Form.Text as={Link} to="/register">
          Don't have account yet? Let's register now!
        </Form.Text>
      </Form.Group>

      {/* <Toast
        className="mt-4"
        onClose={() => setToastControl({ ...toastControl, show: false })}
        show={toastControl?.show}
        bg={toastControl?.variant}
        delay={3000}
        autohide
      >
        <Toast.Header>Message</Toast.Header>
        <Toast.Body>{toastControl?.message}</Toast.Body>
      </Toast> */}
    </Form>
  );
}
