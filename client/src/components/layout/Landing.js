import React from "react";
import { Grid, Button } from "semantic-ui-react";
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
              <Button>Register</Button>
              <Button.Or />
              <Button>Sign in</Button>
            </Button.Group>
          </CenteredPlate>
        </Grid.Column>
      </Grid>
    </FullHeightContainer>
  );
};

export default Landing;
