import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllDialogues } from '../../actions/dialogue';
import { Grid, Card, Button } from 'semantic-ui-react';


const Dialogues = ({ getAllDialogues, dialogue: { dialogues, loading } }) => {
  
  useEffect(() => {
    getAllDialogues();
  }, [getAllDialogues]);
  console.log(dialogues);

  return (
    <Grid centered columns={ 2 }>
      <Grid.Column>
        <Card.Group>
          { loading ? <Spinner /> : (
            dialogues.map(dialogue => (
              <Card>
                <Card.Content>
            <Card.Header>{dialogue.langPair}</Card.Header>
            <Card.Meta>{dialogue.name}</Card.Meta>
                  <Card.Description>
                    {dialogue.description}
        </Card.Description>
                <Button primary>View</Button>
                </Card.Content>
              </Card>
            ))
          ) }
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

Dialogues.propTypes = {
  getAllDialogues: PropTypes.func.isRequired,
  dialogues: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dialogue: state.dialogue
});

export default connect(mapStateToProps, { getAllDialogues })(Dialogues);