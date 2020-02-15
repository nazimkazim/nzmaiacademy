import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

import {
  Button,
  Checkbox,
  Input,
  Form,
  Icon,
  Grid,
  Label,
  Select,
  TextArea,
  List
} from "semantic-ui-react";

const initialState = {
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
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <h1>Create profile</h1>
        <Form
          onSubmit={e => {
            onSubmit(e);
          }}
        >
          <Form.Field required>
            <label>Status</label>
            <select name="status" value={status} onChange={e => onChange(e)}>
              <option value="0">*Select your status</option>
              <option value="Senior Teacher">Senior Teacher</option>
            </select>
          </Form.Field>
          <Form.Field>
            <label>Company</label>
            <input
              placeholder="Microsoft"
              name="company"
              type="text"
              value={company}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Website</label>
            <input
              placeholder="put your website if any"
              name="website"
              type="text"
              value={website}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input
              placeholder="Almaty"
              name="location"
              type="text"
              value={location}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Form.Field required>
            <label>Skills</label>
            <input
              placeholder="Python, Javascript"
              name="skills"
              type="text"
              value={skills}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Bio</label>
            <TextArea
              placeholder="Tell us something about yourself"
              name="bio"
              type="text"
              value={bio}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <span
              className="ui button primary"
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
            >
              Add Social Network Links
            </span>
            <span>Optional</span>
          </Form.Field>
          {displaySocialInputs && (
            <>
              <Form.Field>
                <label>Instagram</label>
                <Input
                  type="text"
                  icon="instagram"
                  iconPosition="left"
                  placeholder="www.instagram.com/nazim"
                  name="instagram"
                  type="text"
                  value={instagram}
                  onChange={e => onChange(e)}
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
                  value={facebook}
                  onChange={e => onChange(e)}
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
                  value={twitter}
                  onChange={e => onChange(e)}
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
                  value={linkedin}
                  onChange={e => onChange(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>Youtube</label>
                <Input
                  icon="youtube"
                  iconPosition="left"
                  placeholder="www.youtube.com/nazim"
                  name="youtube"
                  type="text"
                  value={youtube}
                  onChange={e => onChange(e)}
                />
              </Form.Field>
            </>
          )}
          <List horizontal>
            <List.Item>
              <Button type="submit">Submit</Button>
            </List.Item>
            <List.Item>
              <Link to="/dashboard">
                <Button>Go back</Button>
              </Link>
            </List.Item>
          </List>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(EditProfile)
);
