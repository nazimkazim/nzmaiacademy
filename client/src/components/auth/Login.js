import React, { useState } from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }
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
            <label>Passoword</label>
            <input
              placeholder="Password"
              name="password"
              value={password}
              type="password"
              onChange={e => onChange(e)}
            />
          </Form.Field>

          <Button type="submit">Login</Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
