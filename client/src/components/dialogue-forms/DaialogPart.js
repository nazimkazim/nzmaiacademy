import React from 'react';
import DialogHelper from './DialogHelper';
import { speakersOptions } from "../common/options";
import { NativeSelect, TextField, InputLabel, Button } from '@material-ui/core';
import { insertArrayValueAfterIndex, replaceArrayValueByIndex } from './utilities';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '55ch',
    }
  },
  speaker: {
    display: 'flex',
    flexDirection: 'column',
    padding: 3
  },
  speaker1: {
    backgroundColor: "#D3EDEE"
  },
  speaker2: {
    backgroundColor: "#7BC9CC"
  },
  inputFieldClass: {
    marginBottom: 40
  },
  customButton: {
    marginBottom: 40
  }
}));


const DialogPart = (props) => {
  const classes = useStyles();

  const { part = {}, onChange, onRemove, handlePartHelpersChange, onAudioChange } = props;
  const {
    helpers = [],
    sentence = '',
    translation = '',
    audio = '',
    prompt = '',
    speaker = ''
  } = part;

  const onRemoveHelper = (index) => {
    const updatedHelpers = helpers.filter((value, arrIndex) => index !== arrIndex);
    handlePartHelpersChange(updatedHelpers);
  };

  const onAddMoreHelper = (index) => {
    const updatedHelpers = insertArrayValueAfterIndex(helpers, index, {
      L1: '',
      L2: ''
    });
    handlePartHelpersChange(updatedHelpers);
  };


  const onChangeHelper = (index, helper) => {
    const updatedHelpers = replaceArrayValueByIndex(helpers, index, helper);
    handlePartHelpersChange(updatedHelpers);
  };

  return (
    <div className={ speaker === 'Speaker 1' ? `${classes.speaker} ${classes.speaker1}` : `${classes.speaker} ${classes.speaker2}` }>
      <Button variant="contained" className={ classes.customButton } onClick={ onRemove }>Remove</Button>
      <InputLabel htmlFor="speaker">Speaker</InputLabel>
      <NativeSelect
        value={ speaker }
        onChange={ onChange }
        className={ classes.inputFieldClass }
        name="speaker"
        inputProps={ { 'aria-label': 'age' } }
      >
        { speakersOptions.map(item => (
          <option value={ item.value }>{ item.value }</option>
        )) }
      </NativeSelect>
      <InputLabel htmlFor="sentence">Sentence</InputLabel>
      <TextField
        name="sentence"
        label="I want this apple"
        className={ classes.inputFieldClass }
        value={ sentence }
        onChange={ onChange }
      />
      <InputLabel htmlFor="translation">Translation</InputLabel>
      <TextField
        name="translation"
        className={ classes.inputFieldClass }
        label="Я хочу это яблоко"
        value={ translation }
        onChange={ onChange }
      />
      <InputLabel htmlFor="audio">Recorder voice</InputLabel>
      <TextField
        type="file"
        name="audio"
        placeholder="Audio"
        className={ classes.inputFieldClass }
        value={ audio === '' && audio }
        onChange={ onAudioChange }
      />
      <InputLabel htmlFor="prompt">Prompt</InputLabel>
      <TextField
        name="prompt"
        value={ prompt }
        className={ classes.inputFieldClass }
        label="In this sentence яблоко means apple"
        onChange={ onChange }
      />

      <div className="margin-bottom" />
      <div>
        { helpers.map((value, index) => <DialogHelper key={ index }
          helper={ value }
          onChange={ onChangeHelper.bind(null, index) }
          onRemove={ onRemoveHelper.bind(null, index) }
          onAddMore={ onAddMoreHelper.bind(null, index) } />)
        }
      </div>
    </div>
  );
};

export default DialogPart;
