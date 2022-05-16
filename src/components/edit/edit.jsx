import React, { useState, useEffect } from "react";
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import "./edit.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("id", id);
    fetch("http://localhost:3000/users/" + id)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
        console.log("Eror", JSON.stringify(e));
      });
  }, [id]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    let d = {
      id: id,
      name: form[0].value,
      password: form[1].value,
      email: form[2].value,
      address: form[3].value,
      phoneNo: form[4].value,
      role: form[5].value,
    };
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (
      Object.keys(d).some(
        (k) => !d[k] || (k === "email" && !/\S+@\S+\.\S+/.test(d[k]))
      )
    ) {
      setValidated(true);
    } else {
      fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate(`/details/${id}`);
        })
        .catch((e) => {
          console.log("Eror", JSON.stringify(e));
        });
    }

    setValidated(true);
  };

  const handleChange = (e) => {
    let tempUser = JSON.parse(JSON.stringify(user));
    tempUser[e.target.name] = e.target.value;
    setUser(tempUser);
  };

  return (
    <Form
      noValidate
      validated={true}
      onSubmit={handleSubmit}
      className="register-form"
    >
      <Row className="mb-3">
        <h2>Edit User</h2>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            onChange={handleChange}
            value={user?.name}
            name="name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={user?.password}
            name="password"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Email Id</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Email Id"
              aria-describedby="inputGroupPrepend"
              required
              onChange={handleChange}
              value={user?.email}
              name="email"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a emailId.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            required
            onChange={handleChange}
            value={user?.address}
            name="address"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide address.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Phone Number"
            onChange={handleChange}
            value={user?.phoneNo}
            name="phoneNo"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide phoneNumber.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Role</Form.Label>
          <Form.Select
            defaultValue="Admin"
            required
            onChange={handleChange}
            value={user?.role}
            name="role"
          >
            <option>Admin</option>
            <option>Guest</option>
          </Form.Select>
          {/* <Form.Control required type="text" placeholder="Role" /> */}
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Edit</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={`/details/${id}`}>
        <Button type="button">Cancel</Button>
      </Link>
    </Form>
  );
};

export default Edit;
