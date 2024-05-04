import { useEffect, useState } from "react";
import { Table, Form, Stack, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "../api";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const loadData = async () => {
    await axios
      .get("users")
      .then((res) => {
        const { data } = res;
        setUsers(data);
      })
      .catch((err) => {
        setToken(null);
        navigate("/login");
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRowSelect = (id) => {
    selectedRows.includes(id)
      ? setSelectedRows(selectedRows.filter((i) => id !== i))
      : setSelectedRows([...selectedRows, id]);
  };

  const handleHeadSelect = () =>
    setSelectedRows(selectedRows.length ? [] : users.map((i) => i.id));

  const handleStatusBtnClick = (status) => {
    selectedRows.forEach(async (id) => {
      await axios
        .put(`users/${id}`, { status })
        .then(loadData)
        .catch((err) => console.log(err));
    });
    setSelectedRows([]);
  };

  const handleRemoveBtnClick = () => {
    selectedRows.forEach(async (id) => {
      await axios
        .delete(`users/${id}`, { status })
        .then(loadData)
        .catch((err) => console.log(err));
    });
    setSelectedRows([]);
  };

  return (
    <>
      <Stack direction="horizontal" gap={1} className="mb-2">
        <Button
          variant="outline-secondary"
          onClick={() => handleStatusBtnClick("Blocked")}
          disabled={!selectedRows.length}
        >
          <i className="bi bi-lock-fill"></i>
          <span>Block</span>
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => handleStatusBtnClick("Active")}
          disabled={!selectedRows.length}
        >
          <i className="bi bi-unlock-fill"></i>
        </Button>
        <Button
          variant="outline-danger"
          onClick={handleRemoveBtnClick}
          disabled={!selectedRows.length}
        >
          <i className="bi bi-trash-fill"></i>
        </Button>
      </Stack>
      <Table bordered hover>
        <thead>
          <tr>
            <th onClick={handleHeadSelect}>
              <Form.Check type="checkbox" checked={!!selectedRows.length} />
            </th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Last login</th>
            <th>Registration date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            const {
              id,
              name,
              email,
              password,
              lastLoginDate,
              registerDate,
              status,
            } = item;
            return (
              <tr key={id}>
                <td onClick={() => handleRowSelect(id)}>
                  <Form.Check
                    type="checkbox"
                    checked={selectedRows.includes(id)}
                  />
                </td>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td>{new Date(lastLoginDate).toLocaleString()}</td>
                <td>{new Date(registerDate).toLocaleString()}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
