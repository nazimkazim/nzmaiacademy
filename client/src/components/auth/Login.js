import React, { useState } from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log("success");
  };
  return (
    <Grid centered columns={1}>
      <Grid.Column width={8}>
        <Header as="h1">Login</Header>
        <Form onSubmit={e => onSubmit(e)}>
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
            <label>Passowrd</label>
            <input
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
          </Form.Field>

          <Button type="submit">Login</Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
