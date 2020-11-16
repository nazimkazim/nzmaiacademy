import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDialogueById } from '../../actions/dialogue';
import styled, { keyframes } from 'styled-components';
import { speakStr } from '../helpers/Pronunciation';
import ModalInfo from '../ModalInfo'
import ModalWords from '../ModalWords'




const Strip = styled.div`
  position:relative;
  width:100%;
  height:auto;
  padding:25px;
  border-radius:8px;
  background-color:#CFD8D2;
  margin-bottom:15px;
  cursor:pointer;
  border:1px solid #161827;
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
`;

const Info = styled.button`
  top:3px;
  left:3px;
  position:absolute;
  width:20px;
  height:20px;
  border-radius:50%;
  background:url('https://res.cloudinary.com/nzmai/image/upload/v1605069167/icons/info.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  cursor:pointer;
  outline:none;
  border:none;
`;

const Helper = styled.button`
  top:3px;
  left:26px;
  position:absolute;
  width:20px;
  height:20px;
  border-radius:50%;
  background:url('https://res.cloudinary.com/nzmai/image/upload/v1605537823/icons/language.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  cursor:pointer;
  outline:none;
  border:none;
`;

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
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openHelperModal, setOpenHelperModal] = useState(false);
  const [stripId, setStripId] = useState('')

  useEffect(() => {
    const id = match.params.id;
    getDialogueById(id);
  }, [getDialogueById]);


  //console.log(dialogue && dialogue.parts[0].speaker === 'Speaker 1');
  const speakSentence = (sentence) => {
    !toggleTranslation ? speakStr(sentence, 'en-En') : speakStr(sentence, 'ru-RU');
  };

  //console.log(openModal);
  //console.log(stripId)


  return loading || dialogue === null ? <Spinner /> : (
    <Container>
      <ModalInfo openInfoModal={openInfoModal} id={stripId} setOpenInfoModal={setOpenInfoModal} data = {dialogue.parts} />
      <ModalWords openHelperModal={openHelperModal} id={stripId} setOpenHelperModal={setOpenHelperModal} data = {dialogue.parts} />
      <ToggleButton onClick={ () => setToggleTranslation(!toggleTranslation) } color='blue'>{ !toggleTranslation ? 'show translation' : 'hide translation' }</ToggleButton>
      {dialogue.parts.map((part) => (
        <Strip 
          key={ part._id } 
        >
          <Info onClick={ () => { 
            setOpenInfoModal(true); 
            setStripId(part._id)
            } }></Info>
          <Helper onClick={ () => { 
            setOpenHelperModal(true); 
            setStripId(part._id)
            } }></Helper>
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
            </Sentence> }
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


