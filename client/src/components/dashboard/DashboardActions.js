import React from "react";
import { List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <List horizontal divided>
      <List.Item>
        <List.Content>
          <Icon name="edit" circular size="large" />
          <Link to="/edit-profile">Edit Profile</Link>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <Icon name="microphone" circular size="large" />
          <Link to="/add-dialogue">Add Dialogue Activity</Link>
        </List.Content>
      </List.Item>
    </List>
  );
};

export default DashboardActions;
