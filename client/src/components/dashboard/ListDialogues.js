import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDialoguesByUser } from '../../actions/dialogue';
import { Card, Button } from 'semantic-ui-react';


function ListDialogues({ getDialoguesByUser, dialogue: { dialogues, loading }, auth: { user } }) {
  useEffect(() => {
    getDialoguesByUser(user);
  }, [getDialoguesByUser]);
  //console.log(user);
  //console.log(dialogues);
  return (
    <>
      <h1>My dialogues</h1>
      { loading ? <Spinner /> : (
        dialogues.map(dialogue => (
          <Card>
            <Card.Content>
              <Card.Header>{ dialogue.langPair }</Card.Header>
              <Card.Meta>{ dialogue.name }</Card.Meta>
              <Card.Description>
                { dialogue.description }
              </Card.Description>
              <Link to={ `/dialogues/${dialogue._id}` }><Button primary>View</Button></Link>
            </Card.Content>
          </Card>
        ))
      ) }
    </>
  );
}

ListDialogues.propTypes = {
  auth: PropTypes.object.isRequired,
  getDialoguesByUser: PropTypes.func.isRequired,
  dialogues: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  dialogue: state.dialogue
});

export default connect(mapStateToProps, { getDialoguesByUser })(ListDialogues);