import React, { useState } from "react";
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    let d = {
      first_name: form[0].value,
      last_name: form[1].value,
      email: form[2].value,
      company_name: form[3].value,
      city: form[4].value,
      state: form[5].value,
      zip: form[6].value,
      web: form[7].value,
      age: form[8].value,
    };
    event.preventDefault();
    if (form.checkValidity() === false) {
      debugger;
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
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/login");
        })
        .catch((e) => {
          console.log("Eror", JSON.stringify(e));
        });
    }
    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="register-form"
    >
      <Row className="mb-3">
        <h2>REGISTRATION FORM</h2>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control required type="text" placeholder="First Name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required type="text" placeholder="Last Name" />
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
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a emailId.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" placeholder="Company Name" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide company name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide state.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom06">
          <Form.Label>Zip</Form.Label>
          <Form.Control required type="number" placeholder="Zip" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide zip.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom07">
          <Form.Label>Web</Form.Label>
          <Form.Control required type="text" placeholder="Web" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide web.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom08">
          <Form.Label>Age</Form.Label>
          <Form.Control required type="number" placeholder="Age" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide age.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Register</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={"/login"}>
        <Button type="button">Login</Button>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={"/users"}>
        <Button type="button">Home page</Button>
      </Link>
    </Form>
  );
};

export default Register;
