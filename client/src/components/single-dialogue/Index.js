import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDialogueById } from '../../actions/dialogue';
import styled, { keyframes } from 'styled-components';
import { speakStr } from '../helpers/Pronunciation';



const Strip = styled.div`
  width:100%;
  height:auto;
  padding:25px;
  border-radius:8px;
  background-color:#CFD8D2;
  margin-bottom:15px;
  cursor:pointer;
`;

const ToggleButton = styled.button`
  display:flex;
  align-items:center;
  color:white;
  min-width:100px;
  font-size:16px;
  cursor:pointer;
  height:50px;
  padding:10px 10px;
  margin-bottom:20px;
  background-color:#116EEE;
  border:none;
  border-radius:6px;
  outline:none;
`

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin:100px auto;
  width:90%;
  min-height:300px;
  background-color:##F2F7FD;
  /* border:1px solid #D5B942; */
`;



const underlineAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Sentence = styled.p`
  font-size:18px;
  text-align:${props => props.speaker === "Speaker 1" ? 'left' : 'right'};
  &:hover {
    color:grey;
    transition:${underlineAnimation} 1s;
  }
`;

function Index({ getDialogueById, dialogueStateToProps: { dialogue, loading }, match }) {
  const [toggleTranslation, setToggleTranslation] = useState(false);

  useEffect(() => {
    const id = match.params.id;
    getDialogueById(id);
  }, [getDialogueById]);


  //console.log(dialogue && dialogue.parts[0].speaker === 'Speaker 1');
  const speakSentence = (sentence) => {
    !toggleTranslation ? speakStr(sentence, 'En-en') : speakStr(sentence, 'Ru-ru');
  };


  return loading || dialogue === null ? <Spinner /> : (
    <Container>
      <ToggleButton onClick={ () => setToggleTranslation(!toggleTranslation) } color='blue'>{ !toggleTranslation ? 'show translation' : 'hide translation' }</ToggleButton>

      {dialogue.parts.map((part) => (
        <Strip key={ part._id }>
          {!toggleTranslation ? <Sentence
            speaker={ part.speaker }
            onClick={ () => speakSentence(part.sentence) }
          >
            { part.sentence }
          </Sentence> : <Sentence
            speaker={ part.speaker }
            onClick={ () => speakSentence(part.translation) }
          >
            { part.translation }
          </Sentence>}
          
        </Strip>
      )) }
    </Container>
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


