import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDialogueById } from '../../actions/dialogue';

function Index({ getDialogueById, dialogueStateToProps: { dialogue, loading }, match }) {
  const id = match.params.id;

  useEffect(() => {
    getDialogueById(id);
  }, [getDialogueById]);


  console.log(dialogue && dialogue.parts);

  return loading || dialogue === null ? <Spinner /> : (
    <>
      {dialogue.parts.map((part) => (
        <div key={part._id}>
          <p>{ part.sentence }</p>
        </div>
      )) }
    </>
  );
}

Index.propTypes = {
  getDialogueById: PropTypes.func.isRequired,
  dialogue: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dialogueStateToProps: state.dialogue
});

export default connect(mapStateToProps, { getDialogueById })(Index);


