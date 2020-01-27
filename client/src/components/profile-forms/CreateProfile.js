import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Checkbox,
  Input,
  Form,
  Icon,
  Grid,
  Label,
  Select,
  TextArea
} from "semantic-ui-react";

const CreateProfile = props => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;
  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Form>
          <Form.Field required>
            <label>Status</label>
            <Select
              placeholder="Select your status"
              name="status"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label>Company</label>
            <input placeholder="Microsoft" name="company" type="text" />
          </Form.Field>
          <Form.Field>
            <label>Website</label>
            <input
              placeholder="put your website if any"
              name="website"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input placeholder="Almaty" name="location" type="text" />
          </Form.Field>
          <Form.Field>
            <label>Skills</label>
            <input placeholder="Python, Javascript" name="skills" type="text" />
          </Form.Field>
          <Form.Field>
            <label>Bio</label>
            <TextArea
              placeholder="Tell us something about yourself"
              name="bio"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <Button type="submit">Add Social Network Links</Button>
            Optional
          </Form.Field>
          <Form.Field>
            <label>Instagram</label>
            <Input
              type="text"
              icon="instagram"
              iconPosition="left"
              placeholder="www.instagram.com/nazim"
              name="instagram"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label>Facebook</label>
            <Input
              icon="facebook"
              iconPosition="left"
              placeholder="www.facebook.com/nazim"
              name="facebook"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label>Twitter</label>
            <Input
              icon="twitter"
              iconPosition="left"
              placeholder="www.twitter.com/nazim"
              name="twitter"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label>Linkedin</label>
            <Input
              icon="linkedin"
              iconPosition="left"
              placeholder="www.linkedin.com/nazim"
              name="linkedin"
              type="text"
            />
          </Form.Field>

          <Button type="submit">Submit</Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
