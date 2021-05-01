import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import DialogHelper from './DialogHelper';
import SelectListGroup from "../common/SelectListGroup";
import { speakersOptions } from "../common/options";
import { NativeSelect, TextField } from '@material-ui/core';
import { insertArrayValueAfterIndex, replaceArrayValueByIndex } from './utilities';


const DialogPart = (props) => {
  const { part = {}, onChange, onRemove, handlePartHelpersChange } = props;

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
    <div className={ speaker === 'Speaker 1' ? 'speaker1' : 'speaker2' }>
      {/* <SelectListGroup
        placeholder="Speaker 1"
        info="type a speaker"
        options={ speakersOptions }
        name="speaker"
        value={ speaker }
        onChange={ onChangeProperty.bind(null, "speaker") }
      />
      <TextFieldGroup
        placeholder="I want some cheese"
        info="type example sentence"
        name="sentence"
        value={ sentence }
        onChange={ onChangeProperty.bind(null, "sentence") }
      />
      <TextFieldGroup
        placeholder="Я хочу сыра"
        info="type translation of example sentence in Russian"
        name="translation"
        value={ translation }
        onChange={ onChangeProperty.bind(null, "translation") }
      />
      <TextFieldGroup
        placeholder="Audio"
        info="add audio file"
        name="audio"
        type="file"
        onChange={ onChangeProperty.bind(null, "audio") }
      />
      <TextFieldGroup
        placeholder="Give some hints to people"
        info="Give some hints to people"
        name="prompt"
        value={ prompt }
        onChange={ onChangeProperty.bind(null, "prompt") }
      />

      <input
        type="button"
        value="remove"
        className="ui button primary"
        onClick={ onRemove }
      /> */}
      <NativeSelect
        value={ speaker }
        onChange={ onChange }
        name="speaker"
        inputProps={ { 'aria-label': 'age' } }
      >
        { speakersOptions.map(item => (
          <option value={ item.value }>{ item.value }</option>
        )) }
      </NativeSelect>

      <TextField
        name="sentence"
        value={ sentence }
        onChange={ onChange }
      />

      <TextField
        name="translation"
        value={ translation }
        onChange={ onChange }
      />

      <TextField
        //type="file"
        name="audio"
        placeholder="Audio"
        value={ audio }
        onChange={ onChange }
      />

      <TextField
        name="prompt"
        value={ prompt }
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
