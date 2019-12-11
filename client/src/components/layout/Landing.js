import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  FullHeightContainer,
  CenteredPlate
} from "../../modules/StyledComponents";

const Landing = () => {
  return (
    <FullHeightContainer>
      <Grid>
        <Grid.Column width={16}>
          <CenteredPlate>
            <Button.Group size="large">
              <Button>
                <Link to="/login">Register</Link>
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

export default Landing;
