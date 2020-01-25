import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //state = { activeItem: "home" };
  const [activeItem, handleItemClick] = useState("");

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  //const { activeItem } = this.state;
  const authLinks = (
    <>
      <Link to="/">
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={logout}
        />
      </Link>
      <Link to="/dashboard">
        <Menu.Item name="dashboard" active={activeItem === "dashboard"} />
      </Link>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={e => handleItemClick(e.target.name)}
        />
      </Link>
      <Link to="/register">
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={e => handleItemClick}
        />
      </Link>
      <Link to="/login">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={e => handleItemClick}
        />
      </Link>
      <Link to="/lessons">
        <Menu.Item
          name="lessons"
          active={activeItem === "lessons"}
          onClick={e => handleItemClick}
        />
      </Link>
    </>
  );

  return (
    <Segment inverted>
      <Menu inverted secondary attached>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </Menu>
    </Segment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
