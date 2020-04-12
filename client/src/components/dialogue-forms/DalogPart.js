import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import DialogHelper from './DialogHelper';


export default (props) => {
  const {part = {}, onChange, onRemove} = props;

  const {
    helpers = [],
    sentence = '',
    translation = '',
    audio = '',
    prompt = '',
  } = part;

  const onRemoveHelper = (index) => {
    const newHelpers = part.filter((value, arrIndex) => index !== arrIndex);

    const data = {...part};
    data.helpers = newHelpers;
    onChange(data);
  };

  const onAddMoreHelper = (index) => {
    //copy helpers
    const newHelpers = helpers.filter(() => true);

    const data = {...part};
    //new empty item by index
    data.helpers = newHelpers.splice(index, {});
    onChange(data);
  };

  const onChangeProperty = (propertyName, e) => {
    //copy current helper
    const data = {...part};
    //change value by property name
    data[propertyName] = e.target.value;
    onChange(data);
  };

  return (
    <div>
      <TextFieldGroup
        placeholder="I want some cheese"
        info="type example sentence"
        name="sentence"
        value={sentence}
        onChange={onChangeProperty.bind(null, "sentence")}
      />
      <TextFieldGroup
        placeholder="Я хочу сыра"
        info="type translation of example sentence in Russian"
        name="translation"
        value={translation}
        onChange={onChangeProperty.bind(null, "translation")}
      />
      <TextFieldGroup
        placeholder="Audio"
        info="type example sentence with latin"
        name="audio"
        value={audio}
        onChange={onChangeProperty.bind(null, "audio")}
      />
      <TextFieldGroup
        placeholder="Give some hints to people"
        info="Give some hints to people"
        name="prompt"
        value={prompt}
        onChange={onChangeProperty.bind(null, "prompt")}
      />
      <input
        type="button"
        value="remove"
        className="btn btn-info btn-block mt-4"
        onClick={onRemove}
      />
      <div>
        {helpers.map((value, index) => <DialogHelper key={index}
                                                   helper={helpers[index]}
                                                   onRemove={onRemoveHelper.bind(null, index)}
                                                   onAddMore={onAddMoreHelper.bind(null, index)}/>)
        }
      </div>
    </div>
  );
}