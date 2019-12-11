import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted>
        <Menu inverted secondary attached>
          <Link to="/">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/register">
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/login">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/lessons">
            <Menu.Item
              name="lessons"
              active={activeItem === "lessons"}
              onClick={this.handleItemClick}
            />
          </Link>
        </Menu>
      </Segment>
    );
  }
}
