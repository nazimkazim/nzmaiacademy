import React, { useState } from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import axios from "axios";
import PropTypes from "prop-types";

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords do not match", "warning black");
    } else {
      const newUser = {
        name,
        email,
        password
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        const body = JSON.stringify(newUser);
        const res = await axios.post("/api/users", body, config);
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <Grid centered columns={1}>
      <Grid.Column width={8}>
        <Header as="h1">Sign up</Header>
        <Form onSubmit={e => onSubmit(e)}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Button type="submit">Register</Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Register);
