import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  FullHeightContainer,
  CenteredPlate
} from "../../modules/StyledComponents";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <FullHeightContainer>
      <Grid>
        <Grid.Column width={16}>
          <CenteredPlate>
            <Button.Group size="large">
              <Button>
                <Link to="/register">Register</Link>
              </Button>
              <Button.Or />
              <Button>
                <Link to="/login"> Sign in</Link>
              </Button>
            </Button.Group>
          </CenteredPlate>
        </Grid.Column>
      </Grid>
    </FullHeightContainer>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
