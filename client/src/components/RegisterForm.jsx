import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api";
import { useToast } from "../context/ToastProvider";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { setParams } = useToast();
  const navigate = useNavigate();

  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.id]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("users/register", formData)
      .then((res) => {
        const { data } = res;
        setParams({
          show: true,
          variant: "success",
          message: data?.message,
        });
        navigate('/login')
      })
      .catch((err) => {
        const { response } = err;
        setParams({
          show: true,
          variant: "danger",
          message: response?.data,
        });
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="email"
          id="name"
          onChange={handleChange}
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          id="email"
          onChange={handleChange}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Enter password"
        />
      </Form.Group>
      <Form.Group className="d-flex justify-content-between">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
        <Form.Text as={Link} to="/login">
          Already have account? Let's login now!
        </Form.Text>
      </Form.Group>
    </Form>
  );
}
